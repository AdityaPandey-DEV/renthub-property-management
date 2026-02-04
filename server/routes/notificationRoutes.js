const express = require('express');
const {
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearNotifications
} = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getNotifications);
router.put('/read-all', protect, markAllAsRead);
router.delete('/clear', protect, clearNotifications);
router.put('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteNotification);

module.exports = router;
