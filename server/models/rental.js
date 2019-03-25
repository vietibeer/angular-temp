const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    image: { type: String, required: true },
    title: { type: String, required: true, max: [128, 'Too long, max is 128 characters'] },
    desc: { type: String, required: true },
    footerTitle: { type: String, required: true },
    position: { type: String, required: true, max: [50, 'Too long, max is 50 characters'] },
    shared: Boolean,
    bedrooms: Number,
    category: { type: String, required: true, min: 2, max: 20 },
    dailyRate: Number,
    createAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: "User" }
});

const rental = mongoose.model('Rental', rentalSchema);
module.exports = rental;