// models
const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');

const { handleError } = require('./common');
const moment = require('moment');

exports.createBooking = (req, res) => {
    const { startAt, endAt, totalPrice, guests, days, rental } = req.body;

    const user = res.locals.user; // user is authorization
    const booking = new Booking({ startAt, endAt, totalPrice, guests, days });

    Rental.findById(rental.id)
        .populate('booking')
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

                    // User.update({ _id: user.id }, { $push: { bookings: booking } });
                    User.findOneAndUpdate({ id: user.id }, { $push: { bookings: booking } });

                    rental.save();
                    res.json({ "startAt": booking.startAt, "endAt": booking.endAt });
                });



            } else {
                return res.status(422).send({ errors: [{ title: 'Invaild Booking!', detail: "Choosen dates are already taken!" }] });
            }

        })
}

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