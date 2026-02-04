const express = require('express');
const {
    getProperties,
    getProperty,
    getMyProperties,
    createProperty,
    updateProperty,
    deleteProperty,
    uploadImages
} = require('../controllers/propertyController');
const { getPropertyRooms } = require('../controllers/roomController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Public routes
router.get('/', getProperties);
router.get('/:id', getProperty);
router.get('/:propertyId/rooms', getPropertyRooms);

// Protected routes (Landlord only)
router.get('/me/list', protect, authorize('landlord', 'admin'), getMyProperties);
router.post('/', protect, authorize('landlord'), createProperty);
router.put('/:id', protect, authorize('landlord', 'admin'), updateProperty);
router.delete('/:id', protect, authorize('landlord', 'admin'), deleteProperty);
router.post(
    '/:id/images',
    protect,
    authorize('landlord'),
    upload.array('images', 5),
    uploadImages
);

module.exports = router;
