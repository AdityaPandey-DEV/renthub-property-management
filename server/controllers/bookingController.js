const Booking = require('../models/Booking');
const Room = require('../models/Room');
const Property = require('../models/Property');
const Rental = require('../models/Rental');
const Notification = require('../models/Notification');

// @desc    Create booking request
// @route   POST /api/bookings
// @access  Private (Tenant)
exports.createBooking = async (req, res, next) => {
    try {
        const { roomId, moveInDate, message } = req.body;

        const room = await Room.findById(roomId).populate('property');

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        if (room.status !== 'vacant') {
            return res.status(400).json({
                success: false,
                message: 'Room is not available for booking'
            });
        }

        // Check if tenant already has a pending booking for this room
        const existingBooking = await Booking.findOne({
            room: roomId,
            tenant: req.user.id,
            status: 'pending'
        });

        if (existingBooking) {
            return res.status(400).json({
                success: false,
                message: 'You already have a pending booking for this room'
            });
        }

        const booking = await Booking.create({
            room: roomId,
            property: room.property._id,
            tenant: req.user.id,
            landlord: room.property.owner,
            moveInDate,
            message
        });

        // Create notification for landlord
        await Notification.create({
            user: room.property.owner,
            title: 'New Booking Request',
            message: `You have a new booking request for ${room.roomNumber} at ${room.property.title}`,
            type: 'booking',
            relatedId: booking._id
        });

        res.status(201).json({
            success: true,
            data: booking
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get tenant's bookings
// @route   GET /api/bookings/tenant
// @access  Private (Tenant)
exports.getTenantBookings = async (req, res, next) => {
    try {
        const { status } = req.query;

        const query = { tenant: req.user.id };
        if (status) query.status = status;

        const bookings = await Booking.find(query)
            .populate({
                path: 'room',
                select: 'roomNumber roomType rent images'
            })
            .populate({
                path: 'property',
                select: 'title address images'
            })
            .populate('landlord', 'name email phone')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get landlord's booking requests
// @route   GET /api/bookings/landlord
// @access  Private (Landlord)
exports.getLandlordBookings = async (req, res, next) => {
    try {
        const { status } = req.query;

        const query = { landlord: req.user.id };
        if (status) query.status = status;

        const bookings = await Booking.find(query)
            .populate({
                path: 'room',
                select: 'roomNumber roomType rent images'
            })
            .populate({
                path: 'property',
                select: 'title address'
            })
            .populate('tenant', 'name email phone avatar')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Approve booking
// @route   PUT /api/bookings/:id/approve
// @access  Private (Landlord)
exports.approveBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('room')
            .populate('property');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        if (booking.landlord.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to approve this booking'
            });
        }

        if (booking.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: 'Booking has already been processed'
            });
        }

        // Update booking status
        booking.status = 'approved';
        await booking.save();

        // Update room status
        await Room.findByIdAndUpdate(booking.room._id, {
            status: 'occupied',
            currentTenant: booking.tenant
        });

        // Update property available rooms
        await Property.findByIdAndUpdate(booking.property._id, {
            $inc: { availableRooms: -1 }
        });

        // Create rental agreement
        const rental = await Rental.create({
            room: booking.room._id,
            property: booking.property._id,
            tenant: booking.tenant,
            landlord: booking.landlord,
            booking: booking._id,
            startDate: booking.moveInDate,
            monthlyRent: booking.room.rent,
            deposit: booking.room.deposit
        });

        // Reject other pending bookings for this room
        await Booking.updateMany(
            {
                room: booking.room._id,
                _id: { $ne: booking._id },
                status: 'pending'
            },
            {
                status: 'rejected',
                rejectionReason: 'Room has been rented to another tenant'
            }
        );

        // Create notification for tenant
        await Notification.create({
            user: booking.tenant,
            title: 'Booking Approved!',
            message: `Your booking for ${booking.room.roomNumber} at ${booking.property.title} has been approved`,
            type: 'booking',
            relatedId: booking._id
        });

        res.status(200).json({
            success: true,
            data: booking,
            rental
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Reject booking
// @route   PUT /api/bookings/:id/reject
// @access  Private (Landlord)
exports.rejectBooking = async (req, res, next) => {
    try {
        const { reason } = req.body;

        const booking = await Booking.findById(req.params.id)
            .populate('room')
            .populate('property');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        if (booking.landlord.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to reject this booking'
            });
        }

        if (booking.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: 'Booking has already been processed'
            });
        }

        booking.status = 'rejected';
        booking.rejectionReason = reason || 'Request rejected by landlord';
        await booking.save();

        // Create notification for tenant
        await Notification.create({
            user: booking.tenant,
            title: 'Booking Rejected',
            message: `Your booking for ${booking.room.roomNumber} at ${booking.property.title} has been rejected`,
            type: 'booking',
            relatedId: booking._id
        });

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private (Tenant)
exports.cancelBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        if (booking.tenant.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to cancel this booking'
            });
        }

        if (booking.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: 'Can only cancel pending bookings'
            });
        }

        booking.status = 'cancelled';
        await booking.save();

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        next(error);
    }
};
