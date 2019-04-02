const { handleError } = require('./common');
const Rental = require('../models/rental');
const User = require('../models/user');

/**
 * Function get user rentals
 * @param {any} req 
 * @param {any} res 
 */
const getUserRentals = (req, res) => {
    const user = res.locals.user;

    Rental.where({ user })
        .populate('bookings').exec((err, foundRental) => {

            if (err) return res.status(422).send({ errors: handleError(err.errors) });

            res.json(foundRental);
        });
};

/**
 * Function get rental by id
 * @param {any} req 
 * @param {any} res 
 */
const getRentalById = (req, res) => {
    Rental.findById(req.params.id)
        .populate({ path: 'bookings', select: 'startAt endAt' })
        .populate({ path: 'user', select: 'username' })
        .exec((err, foundRental) => {

            if (err || !foundRental) return res.status(422).send({ errors: handleError(err.errors) });

            res.json(foundRental);
        });
};

/**
 * Function get rental by city
 * @param {any} req 
 * @param {any} res 
 */
const getRentalByCity = (req, res) => {

    const position = req.query.position;
    const query = position ? { position: position.toLowerCase() } : {};
    Rental.find(query).select('-bookings').exec(function (err, foundRentals) {

        if (err) return res.status(422).send({ errors: handleError(err.errors) });

        if (position && foundRentals.length === 0) return res.status(422).send({ errors: [{ title: 'No Rentals Found!', detail: `There are no rentals for city ${position}` }] });

        res.json(foundRentals);
    });

};

/**
 * Function create rental
 * @param {any} req 
 * @param {any} res 
 */
const createRental = (req, res) => {
    const { image, title, desc, footerTitle, position, city, shared, bedrooms, category, dailyRate } = req.body;

    const user = res.locals.user; // The user is saved  when done authMiddleware . Paths: ./controllers/user

    const rental = new Rental({ image, title, desc, footerTitle, position, city, shared, bedrooms, category, dailyRate });
    rental.user = user;

    Rental.create(rental, (err, newRental) => {

        if (err) return res.status(422).send({ errors: handleError(err.errors) });

        // push newRantal id to user.rentals array 
        User.update({ _id: user.id }, { $push: { rentals: newRental } }, function () { });

        return res.json(newRental);

    })

};

/**
 * Function update user
 * @param {any} req 
 * @param {any} res 
 */
const updateRental = (req, res) => {
    const dataRentalUpdate = req.body;
    const user = res.locals.user;

    Rental.findById(req.params.id)
        .populate('user')
        .exec((err, rental) => {

            if (err) return res.status(422).send({ errors: handleError(err.errors) });

            if (rental.user.id !== user.id) return res.status(422).send({ errors: [{ title: 'Invalid User!', detail: `You are not rental owner!` }] });

            rental.set(dataRentalUpdate);
            rental.save((err) => {
                if (err) return res.status(422).send({ errors: handleError(err.errors) });
                return res.status(200).send(rental);
            });
        });
};

/**
 * Function delete rental
 * @param {any} req 
 * @param {any} res 
 */
const deleteRental = (req, res) => {
    const user = res.locals.user;

    Rental.findById(req.params.id)
        .populate('user', 'id')
        .populate({
            path: 'bookings',
            select: 'startAt',
            match: { startAt: { $gt: new Date() } } //$gt => greater than
        })
        .exec((err, rental) => {
            if (err) return res.status(422).send({ errors: handleError(err.errors) });

            if (rental.user.id !== user.id) return res.status(422).send({ errors: [{ title: 'Invalid User!', detail: `You are not rental owner!` }] });

            if (rental.bookings.length > 0) return res.status(422).send({ errors: [{ title: 'Active Bookings!', detail: `Cannot delete rental with active bookings!` }] });

            rental.remove((err) => {
                if (err) return res.status(422).send({ errors: handleError(err.errors) });

                User.update({ _id: user.id }, { $pull: { rentals: rental.id } }, () => { })

                return res.json({ 'status': 'deleted' });
            })
        });
}

module.exports = {
    getUserRentals: getUserRentals,
    getRentalById: getRentalById,
    getRentalByCity: getRentalByCity,
    createRental: createRental,
    updateRental: updateRental,
    deleteRental: deleteRental,
}