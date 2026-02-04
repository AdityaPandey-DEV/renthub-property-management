const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    landlord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    requestDate: {
        type: Date,
        default: Date.now
    },
    moveInDate: {
        type: Date,
        required: [true, 'Please provide expected move-in date']
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'cancelled'],
        default: 'pending'
    },
    message: {
        type: String,
        maxlength: [500, 'Message cannot exceed 500 characters']
    },
    rejectionReason: {
        type: String,
        maxlength: [500, 'Reason cannot exceed 500 characters']
    }
}, {
    timestamps: true
});

// Index for queries
bookingSchema.index({ tenant: 1, status: 1 });
bookingSchema.index({ landlord: 1, status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
