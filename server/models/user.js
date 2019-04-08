const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, min is 32 characters']
    },
    email: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, min is 32 characters'],
        unique: true,
        lowercase: true,
        required: 'Email is required',
        match: [/(^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:[a-zA-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$)|(^\s*$)/]
    },
    password: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, min is 32 characters'],
        required: "Password is required"
    },
    stripeCustomerId: String,
    revenue: Number,
    rentals: [{
        type: Schema.Types.ObjectId,
        ref: 'Rental'
    }],
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: "Booking"
    }]
});

userSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

userSchema.set('toJSON', { virtuals: true });

userSchema.methods.isSamePassword = async function(passwordConfirm) {
    const match = await bcrypt.compare(passwordConfirm, this.password);
    return match;
}

userSchema.pre('save', function(next) {

    const user = this;
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });

});

const user = mongoose.model('User', userSchema);
module.exports = user;