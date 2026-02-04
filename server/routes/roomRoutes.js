const express = require('express');
const {
    getRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom
} = require('../controllers/roomController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getRooms);
router.get('/:id', getRoom);

// Protected routes (Landlord only)
router.post('/', protect, authorize('landlord'), createRoom);
router.put('/:id', protect, authorize('landlord', 'admin'), updateRoom);
router.delete('/:id', protect, authorize('landlord', 'admin'), deleteRoom);

module.exports = router;
