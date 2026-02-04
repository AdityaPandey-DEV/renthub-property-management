const Property = require('../models/Property');
const Room = require('../models/Room');

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res, next) => {
    try {
        const { city, state, propertyType, page = 1, limit = 10 } = req.query;

        const query = { isActive: true };

        if (city) query['address.city'] = new RegExp(city, 'i');
        if (state) query['address.state'] = new RegExp(state, 'i');
        if (propertyType) query.propertyType = propertyType;

        const skip = (page - 1) * limit;

        const properties = await Property.find(query)
            .populate('owner', 'name email phone')
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const total = await Property.countDocuments(query);

        res.status(200).json({
            success: true,
            count: properties.length,
            total,
            pages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            data: properties
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
exports.getProperty = async (req, res, next) => {
    try {
        const property = await Property.findById(req.params.id)
            .populate('owner', 'name email phone avatar')
            .populate('rooms');

        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }

        res.status(200).json({
            success: true,
            data: property
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get landlord's properties
// @route   GET /api/properties/my
// @access  Private (Landlord)
exports.getMyProperties = async (req, res, next) => {
    try {
        const properties = await Property.find({ owner: req.user.id })
            .populate('rooms')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: properties.length,
            data: properties
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create property
// @route   POST /api/properties
// @access  Private (Landlord)
exports.createProperty = async (req, res, next) => {
    try {
        req.body.owner = req.user.id;

        const property = await Property.create(req.body);

        res.status(201).json({
            success: true,
            data: property
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (Landlord - owner)
exports.updateProperty = async (req, res, next) => {
    try {
        let property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }

        // Check ownership
        if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this property'
            });
        }

        property = await Property.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: property
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private (Landlord - owner)
exports.deleteProperty = async (req, res, next) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }

        // Check ownership
        if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this property'
            });
        }

        // Delete associated rooms
        await Room.deleteMany({ property: property._id });

        await property.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Property deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Upload property images
// @route   POST /api/properties/:id/images
// @access  Private (Landlord - owner)
exports.uploadImages = async (req, res, next) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }

        // Check ownership
        if (property.owner.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this property'
            });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please upload at least one image'
            });
        }

        const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
        property.images = [...property.images, ...imagePaths];
        await property.save();

        res.status(200).json({
            success: true,
            data: property
        });
    } catch (error) {
        next(error);
    }
};
