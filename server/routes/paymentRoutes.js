const express = require('express');
const {
    getPayments,
    getPendingPayments,
    createPayment,
    confirmPayment,
    generateMonthlyPayments,
    getPaymentStats
} = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getPayments);
router.get('/pending', protect, getPendingPayments);
router.get('/stats', protect, authorize('landlord'), getPaymentStats);
router.post('/', protect, authorize('landlord'), createPayment);
router.put('/:id/confirm', protect, authorize('landlord'), confirmPayment);
router.post('/generate', protect, authorize('admin', 'landlord'), generateMonthlyPayments);

module.exports = router;
