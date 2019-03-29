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
    createdAt: { type: Date, default: Date.now },
})

const booking = mongoose.model('Booking', bookingSchema);

module.exports = booking;