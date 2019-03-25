const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    rentals: [{
        type: Schema.Types.ObjectId,
        ref: 'Rental'
    }]
});

const user = mongoose.model('User', userSchema);
module.exports = user;