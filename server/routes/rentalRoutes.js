const express = require('express');
const {
    getRentals,
    getRental,
    getRentalHistory,
    terminateRental,
    completeRental
} = require('../controllers/rentalController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getRentals);
router.get('/history', protect, getRentalHistory);
router.get('/:id', protect, getRental);
router.put('/:id/terminate', protect, authorize('landlord', 'admin'), terminateRental);
router.put('/:id/complete', protect, authorize('landlord'), completeRental);

module.exports = router;
