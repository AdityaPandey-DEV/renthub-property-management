const express = require('express');
const {
    createBooking,
    getTenantBookings,
    getLandlordBookings,
    approveBooking,
    rejectBooking,
    cancelBooking
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Tenant routes
router.post('/', protect, authorize('tenant'), createBooking);
router.get('/tenant', protect, authorize('tenant'), getTenantBookings);
router.put('/:id/cancel', protect, authorize('tenant'), cancelBooking);

// Landlord routes
router.get('/landlord', protect, authorize('landlord'), getLandlordBookings);
router.put('/:id/approve', protect, authorize('landlord'), approveBooking);
router.put('/:id/reject', protect, authorize('landlord'), rejectBooking);

module.exports = router;
