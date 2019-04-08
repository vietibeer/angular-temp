const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    fromUser: { type: Schema.Types.ObjectId, ref: 'User' },
    fromStripeCustomerId: String,
    toUser: { type: Schema.Types.ObjectId, ref: 'User' },
    booking: { type: Schema.Types.ObjectId, ref: 'Booking' },
    amount: Number,
    tokenId: String,
    charge: Schema.Types.Mixed,
    status: { type: String, default: 'pending' }
});

paymentSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

paymentSchema.set('toJSON', { virtuals: true });

const payment = mongoose.model('Payment', paymentSchema);

module.exports = payment;