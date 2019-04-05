// models
const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');

const { handleError } = require('./common');
const moment = require('moment');

/**
 * Function create booking
 * @param {any} req 
 * @param {any} res 
 */
const createBooking = (req, res) => {
    const { startAt, endAt, totalPrice, guests, days, rental } = req.body;

    const user = res.locals.user; // user is authorization
    const booking = new Booking({ startAt, endAt, totalPrice, guests, days });

    Rental.findById(rental.id)
        .populate('bookings')
        .populate('user').exec((err, rental) => {

            if (err) return res.status(422).send({ errors: handleError(err.errors) });

            if (rental.user.id === user.id) {
                return res.status(422).send({ errors: [{ title: 'Invaild User!', detail: "Cannot create booking on your Rental!" }] });
            }

            if (isValidBooking(booking, rental)) {

                booking.user = user;
                booking.rental = rental;
                rental.bookings.push(booking);
                booking.save((err) => {
                    if (err) return res.status(422).send({ errors: handleError(err.errors) });

                    User.update({ _id: user.id }, { $push: { bookings: booking } }, function () { });

                    rental.save();
                    res.json({ "startAt": booking.startAt, "endAt": booking.endAt });
                });



            } else {
                return res.status(422).send({ errors: [{ title: 'Invaild Booking!', detail: "Choosen dates are already taken!" }] });
            }

        })
}

/**
 * Function get user bookings
 * @param {any} req 
 * @param {any} res 
 */
const getUserBookings = (req, res) => {
    const user = res.locals.user;
    Booking.find({ user })
        .populate('rental')
        .exec((err, booking) => {

            if (err) return res.status(422).send({ errors: handleError(err.errors) });

            return res.json(booking);
        })
};

/**
 * Function check is valid booking
 * @param {Booking} booking 
 * @param {Rental} rental 
 */
function isValidBooking(booking, rental) {
    let isValid = true;

    if (rental.bookings && rental.bookings.length > 0) {
        isValid = rental.bookings.every((didBooking) => {

            if (
                (moment(didBooking.startAt) < moment(booking.startAt) && moment(didBooking.endAt) < moment(booking.startAt)) ||
                (moment(booking.endAt) < moment(didBooking.endAt) && moment(booking.endAt) < moment(didBooking.startAt))
            ) {
                return true;
            } else {
                return false;
            }

        });

    }

    return isValid;
}

module.exports = {
    createBooking: createBooking,
    getUserBookings: getUserBookings
}