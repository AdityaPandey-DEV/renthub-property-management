const Room = require('../models/Room');
const Property = require('../models/Property');

// @desc    Get all vacant rooms with filters
// @route   GET /api/rooms
// @access  Public
exports.getRooms = async (req, res, next) => {
    try {
        const {
            city,
            state,
            minRent,
            maxRent,
            roomType,
            amenities,
            page = 1,
            limit = 10
        } = req.query;

        // Build query for rooms
        const roomQuery = { status: 'vacant' };

        if (minRent) roomQuery.rent = { $gte: parseInt(minRent) };
        if (maxRent) roomQuery.rent = { ...roomQuery.rent, $lte: parseInt(maxRent) };
        if (roomType) roomQuery.roomType = roomType;
        if (amenities) {
            const amenityList = amenities.split(',');
            roomQuery.amenities = { $all: amenityList };
        }

        const skip = (page - 1) * limit;

        // Get rooms with property details
        let rooms = await Room.find(roomQuery)
            .populate({
                path: 'property',
                match: {
                    isActive: true,
                    ...(city && { 'address.city': new RegExp(city, 'i') }),
                    ...(state && { 'address.state': new RegExp(state, 'i') })
                },
                populate: {
                    path: 'owner',
                    select: 'name email phone'
                }
            })
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        // Filter out rooms where property didn't match
        rooms = rooms.filter(room => room.property !== null);

        const total = rooms.length;

        res.status(200).json({
            success: true,
            count: rooms.length,
            total,
            pages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            data: rooms
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get rooms of a property
// @route   GET /api/properties/:propertyId/rooms
// @access  Public
exports.getPropertyRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find({ property: req.params.propertyId })
            .sort({ roomNumber: 1 });

        res.status(200).json({
            success: true,
            count: rooms.length,
            data: rooms
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single room
// @route   GET /api/rooms/:id
// @access  Public
exports.getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id)
            .populate({
                path: 'property',
                populate: {
                    path: 'owner',
                    select: 'name email phone avatar'
                }
            })
            .populate('currentTenant', 'name email phone');

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        res.status(200).json({
            success: true,
            data: room
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create room
// @route   POST /api/rooms
// @access  Private (Landlord)
exports.createRoom = async (req, res, next) => {
    try {
        const { propertyId } = req.body;

        // Check if property exists and is owned by user
        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }

        if (property.owner.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to add rooms to this property'
            });
        }

        req.body.property = propertyId;
        const room = await Room.create(req.body);

        // Update property room count
        property.totalRooms += 1;
        property.availableRooms += 1;
        await property.save();

        res.status(201).json({
            success: true,
            data: room
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update room
// @route   PUT /api/rooms/:id
// @access  Private (Landlord - owner)
exports.updateRoom = async (req, res, next) => {
    try {
        let room = await Room.findById(req.params.id).populate('property');

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        // Check ownership through property
        if (room.property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this room'
            });
        }

        // Track status change
        const previousStatus = room.status;

        room = await Room.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // Update available room count if status changed
        if (previousStatus !== room.status) {
            const property = await Property.findById(room.property);
            if (previousStatus === 'vacant' && room.status !== 'vacant') {
                property.availableRooms -= 1;
            } else if (previousStatus !== 'vacant' && room.status === 'vacant') {
                property.availableRooms += 1;
            }
            await property.save();
        }

        res.status(200).json({
            success: true,
            data: room
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete room
// @route   DELETE /api/rooms/:id
// @access  Private (Landlord - owner)
exports.deleteRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id).populate('property');

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        // Check ownership
        if (room.property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this room'
            });
        }

        // Update property room count
        const property = await Property.findById(room.property._id);
        property.totalRooms -= 1;
        if (room.status === 'vacant') {
            property.availableRooms -= 1;
        }
        await property.save();

        await room.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Room deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
