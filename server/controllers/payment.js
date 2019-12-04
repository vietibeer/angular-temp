const { handleError } = require('./common');
const Payment = require('../models/payment');
const Booking = require('../models/booking');
const User = require('../models/user');
const config = require('../config');
const stripe = require('stripe')(config.STRIPE_SK);
/**
 * Function get pending payment
 * @param {any} req 
 * @param {any} res 
 */
const getPendingPayment = (req, res) => {
    const user = res.locals.user;

    Payment.find({ toUser: user })
        .populate({ path: "booking", populate: { path: "rental" } })
        .populate('fromUser')
        .exec((err, payments) => {
            if (err) return res.status(422).send({ errors: handleError(err.errors) });

            return res.json(payments);
        });
}

/**
 * Function accept payment
 * @param {any} req 
 * @param {any} res 
 */
const acceptPayment = (req, res) => {

    const payment = req.body;
    const { booking } = payment;
    const user = res.locals.user;

    Payment.findById(payment.id).populate('toUser').exec(async(err, foundPayment) => {
        if (err) return res.status(422).send({ errors: handleError(err.errors) });

        if (foundPayment.status === 'pending' && user.id === foundPayment.toUser.id) {

            const charge = await stripe.charges.create({
                amount: booking.totalPrice * 100,
                currency: 'usd',
                customer: payment.fromStripeCustomerId
            });
            console.log(charge);
            if (charge) {
                Booking.updateOne({ _id: booking }, { status: 'active' }, () => {});

                foundPayment.charge = charge;
                foundPayment.status = 'paid'; // đã trả tiền

                foundPayment.save((err) => {
                    if (err) return res.status(422).send({ errors: handleError(err.errors) });

                    User.update({ _id: foundPayment.toUser }, { $inc: { revenue: foundPayment.amount } }, (err, user) => { //revenue: tiền lời
                        if (err) return res.status(422).send({ errors: handleError(err.errors) });
                        return res.json({ status: 'paid' });
                    });

                });
            }

        }
    });
}

/**
 * Function decline payment
 * @param {any} req 
 * @param {any} res 
 */
const declinePayment = (req, res) => {
    const payment = req.body;
    const { booking } = payment;

    Booking.deleteOne({ id: booking._id }, (err, deletedBooking) => {

        if (err) {
            return res.status(422).send({ errors: handleError(err.errors) });
        }

        Payment.update({ _id: payment._id }, { status: 'declined' }, function() {});
        Rental.update({ _id: booking.rental }, { $pull: { bookings: booking._id } }, () => {});

        return res.json({ status: 'deleted' });

    })

}

module.exports = {
    getPendingPayment: getPendingPayment,
    acceptPayment: acceptPayment,
    declinePayment: declinePayment
}