const Rental = require('../models/Rental');
const Room = require('../models/Room');
const Property = require('../models/Property');
const Notification = require('../models/Notification');

// @desc    Get rentals
// @route   GET /api/rentals
// @access  Private
exports.getRentals = async (req, res, next) => {
    try {
        const { status } = req.query;

        // Build query based on user role
        let query = {};
        if (req.user.role === 'tenant') {
            query.tenant = req.user.id;
        } else if (req.user.role === 'landlord') {
            query.landlord = req.user.id;
        }
        if (status) query.status = status;

        const rentals = await Rental.find(query)
            .populate({
                path: 'room',
                select: 'roomNumber roomType rent images'
            })
            .populate({
                path: 'property',
                select: 'title address images'
            })
            .populate('tenant', 'name email phone avatar')
            .populate('landlord', 'name email phone')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: rentals.length,
            data: rentals
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single rental
// @route   GET /api/rentals/:id
// @access  Private
exports.getRental = async (req, res, next) => {
    try {
        const rental = await Rental.findById(req.params.id)
            .populate({
                path: 'room',
                populate: { path: 'property' }
            })
            .populate('tenant', 'name email phone avatar address')
            .populate('landlord', 'name email phone');

        if (!rental) {
            return res.status(404).json({
                success: false,
                message: 'Rental not found'
            });
        }

        // Check authorization
        if (
            rental.tenant._id.toString() !== req.user.id &&
            rental.landlord._id.toString() !== req.user.id &&
            req.user.role !== 'admin'
        ) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this rental'
            });
        }

        res.status(200).json({
            success: true,
            data: rental
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get rental history
// @route   GET /api/rentals/history
// @access  Private
exports.getRentalHistory = async (req, res, next) => {
    try {
        let query = { status: { $in: ['completed', 'terminated'] } };

        if (req.user.role === 'tenant') {
            query.tenant = req.user.id;
        } else if (req.user.role === 'landlord') {
            query.landlord = req.user.id;
        }

        const rentals = await Rental.find(query)
            .populate({
                path: 'room',
                select: 'roomNumber roomType'
            })
            .populate({
                path: 'property',
                select: 'title address'
            })
            .populate('tenant', 'name email')
            .sort({ endDate: -1 });

        res.status(200).json({
            success: true,
            count: rentals.length,
            data: rentals
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Terminate rental
// @route   PUT /api/rentals/:id/terminate
// @access  Private (Landlord)
exports.terminateRental = async (req, res, next) => {
    try {
        const { reason, endDate } = req.body;

        const rental = await Rental.findById(req.params.id)
            .populate('room')
            .populate('property');

        if (!rental) {
            return res.status(404).json({
                success: false,
                message: 'Rental not found'
            });
        }

        if (rental.landlord.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to terminate this rental'
            });
        }

        if (rental.status !== 'active') {
            return res.status(400).json({
                success: false,
                message: 'Rental is not active'
            });
        }

        // Update rental
        rental.status = 'terminated';
        rental.endDate = endDate || new Date();
        rental.terminationReason = reason;
        await rental.save();

        // Update room status
        await Room.findByIdAndUpdate(rental.room._id, {
            status: 'vacant',
            currentTenant: null
        });

        // Update property available rooms
        await Property.findByIdAndUpdate(rental.property._id, {
            $inc: { availableRooms: 1 }
        });

        // Notify tenant
        await Notification.create({
            user: rental.tenant,
            title: 'Rental Terminated',
            message: `Your rental for ${rental.room.roomNumber} at ${rental.property.title} has been terminated`,
            type: 'rental',
            relatedId: rental._id
        });

        res.status(200).json({
            success: true,
            data: rental
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Complete rental (tenant moves out)
// @route   PUT /api/rentals/:id/complete
// @access  Private (Landlord)
exports.completeRental = async (req, res, next) => {
    try {
        const { depositReturned } = req.body;

        const rental = await Rental.findById(req.params.id)
            .populate('room')
            .populate('property');

        if (!rental) {
            return res.status(404).json({
                success: false,
                message: 'Rental not found'
            });
        }

        if (rental.landlord.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to complete this rental'
            });
        }

        if (rental.status !== 'active') {
            return res.status(400).json({
                success: false,
                message: 'Rental is not active'
            });
        }

        // Update rental
        rental.status = 'completed';
        rental.endDate = new Date();
        rental.depositReturned = depositReturned || false;
        await rental.save();

        // Update room status
        await Room.findByIdAndUpdate(rental.room._id, {
            status: 'vacant',
            currentTenant: null
        });

        // Update property available rooms
        await Property.findByIdAndUpdate(rental.property._id, {
            $inc: { availableRooms: 1 }
        });

        res.status(200).json({
            success: true,
            data: rental
        });
    } catch (error) {
        next(error);
    }
};
