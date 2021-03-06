const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    startAt: { type: Date, required: "Starting Date is Required" },
    endAt: { type: Date, required: "Ending Date is Required" },
    totalPrice: { type: Number },
    guests: { type: Number },
    days: { type: Number },
    rental: { type: Schema.Types.ObjectId, ref: "Rental" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

bookingSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

bookingSchema.set('toJSON', { virtuals: true });

const booking = mongoose.model('Booking', bookingSchema);

module.exports = booking;