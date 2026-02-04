const Payment = require('../models/Payment');
const Rental = require('../models/Rental');
const Notification = require('../models/Notification');

// @desc    Get payments
// @route   GET /api/payments
// @access  Private
exports.getPayments = async (req, res, next) => {
    try {
        const { status, rentalId } = req.query;

        let query = {};
        if (req.user.role === 'tenant') {
            query.tenant = req.user.id;
        } else if (req.user.role === 'landlord') {
            query.landlord = req.user.id;
        }
        if (status) query.status = status;
        if (rentalId) query.rental = rentalId;

        const payments = await Payment.find(query)
            .populate({
                path: 'rental',
                populate: [
                    { path: 'room', select: 'roomNumber' },
                    { path: 'property', select: 'title' }
                ]
            })
            .populate('tenant', 'name email')
            .sort({ dueDate: -1 });

        res.status(200).json({
            success: true,
            count: payments.length,
            data: payments
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get pending payments
// @route   GET /api/payments/pending
// @access  Private
exports.getPendingPayments = async (req, res, next) => {
    try {
        let query = { status: 'pending' };

        if (req.user.role === 'tenant') {
            query.tenant = req.user.id;
        } else if (req.user.role === 'landlord') {
            query.landlord = req.user.id;
        }

        const payments = await Payment.find(query)
            .populate({
                path: 'rental',
                populate: [
                    { path: 'room', select: 'roomNumber' },
                    { path: 'property', select: 'title' }
                ]
            })
            .populate('tenant', 'name email phone')
            .sort({ dueDate: 1 });

        res.status(200).json({
            success: true,
            count: payments.length,
            data: payments
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create payment record
// @route   POST /api/payments
// @access  Private (Landlord)
exports.createPayment = async (req, res, next) => {
    try {
        const { rentalId, amount, paymentType, dueDate, month, year, notes } = req.body;

        const rental = await Rental.findById(rentalId);

        if (!rental) {
            return res.status(404).json({
                success: false,
                message: 'Rental not found'
            });
        }

        if (rental.landlord.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to create payment for this rental'
            });
        }

        const payment = await Payment.create({
            rental: rentalId,
            tenant: rental.tenant,
            landlord: rental.landlord,
            amount,
            paymentType,
            dueDate,
            month,
            year,
            notes
        });

        // Notify tenant
        await Notification.create({
            user: rental.tenant,
            title: 'Payment Due',
            message: `Rent payment of ₹${amount} is due on ${new Date(dueDate).toLocaleDateString()}`,
            type: 'payment',
            relatedId: payment._id
        });

        res.status(201).json({
            success: true,
            data: payment
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Confirm payment (mark as paid)
// @route   PUT /api/payments/:id/confirm
// @access  Private (Landlord)
exports.confirmPayment = async (req, res, next) => {
    try {
        const { paymentMethod, transactionId } = req.body;

        const payment = await Payment.findById(req.params.id).populate('rental');

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
        }

        if (payment.landlord.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to confirm this payment'
            });
        }

        if (payment.status === 'completed') {
            return res.status(400).json({
                success: false,
                message: 'Payment is already confirmed'
            });
        }

        payment.status = 'completed';
        payment.paymentDate = new Date();
        payment.paymentMethod = paymentMethod || 'cash';
        payment.transactionId = transactionId || `TXN${Date.now()}`;
        await payment.save();

        // Notify tenant
        await Notification.create({
            user: payment.tenant,
            title: 'Payment Confirmed',
            message: `Your payment of ₹${payment.amount} for ${payment.month} ${payment.year} has been confirmed`,
            type: 'payment',
            relatedId: payment._id
        });

        res.status(200).json({
            success: true,
            data: payment
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Generate payment for all active rentals (Mock - would be scheduled job)
// @route   POST /api/payments/generate
// @access  Private (Admin/System)
exports.generateMonthlyPayments = async (req, res, next) => {
    try {
        const currentDate = new Date();
        const month = currentDate.toLocaleString('default', { month: 'long' });
        const year = currentDate.getFullYear();
        const dueDate = new Date(year, currentDate.getMonth(), 5); // Due on 5th of each month

        const activeRentals = await Rental.find({ status: 'active' });

        const payments = [];

        for (const rental of activeRentals) {
            // Check if payment already exists for this month
            const existingPayment = await Payment.findOne({
                rental: rental._id,
                month,
                year,
                paymentType: 'rent'
            });

            if (!existingPayment) {
                const payment = await Payment.create({
                    rental: rental._id,
                    tenant: rental.tenant,
                    landlord: rental.landlord,
                    amount: rental.monthlyRent,
                    paymentType: 'rent',
                    dueDate,
                    month,
                    year
                });

                // Notify tenant
                await Notification.create({
                    user: rental.tenant,
                    title: 'Monthly Rent Due',
                    message: `Rent payment of ₹${rental.monthlyRent} for ${month} is due by ${dueDate.toLocaleDateString()}`,
                    type: 'payment',
                    relatedId: payment._id
                });

                payments.push(payment);
            }
        }

        res.status(201).json({
            success: true,
            message: `Generated ${payments.length} payment records`,
            data: payments
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get payment statistics
// @route   GET /api/payments/stats
// @access  Private (Landlord)
exports.getPaymentStats = async (req, res, next) => {
    try {
        const stats = await Payment.aggregate([
            { $match: { landlord: req.user._id } },
            {
                $group: {
                    _id: '$status',
                    total: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            }
        ]);

        const formattedStats = {
            pending: { total: 0, count: 0 },
            completed: { total: 0, count: 0 },
            failed: { total: 0, count: 0 }
        };

        stats.forEach(stat => {
            formattedStats[stat._id] = { total: stat.total, count: stat.count };
        });

        res.status(200).json({
            success: true,
            data: formattedStats
        });
    } catch (error) {
        next(error);
    }
};
