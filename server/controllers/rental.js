const { handleError } = require('./common');
const Rental = require('../models/rental');
const User = require('../models/user');

/**
 * Function get rental by id
 * @param {any} req 
 * @param {any} res 
 */
const getRentalById = (req, res) => {
    Rental.findById(req.params.rentalId)
        .populate({ path: 'bookings', select: 'startAt endAt' })
        .populate({ path: 'user', select: 'username' })
        .exec((err, foundRentals) => {

            if (err) return res.status(422).send({ errors: handleError(err.errors) });

            res.json(foundRentals);
        });
};

/**
 * Function get rental by city
 * @param {any} req 
 * @param {any} res 
 */
const getRentalByCity = (req, res) => {

    const position = req.query.position;
    const query = position ? { position: position.toLowerCase(), city: position.toLowerCase() } : {};

    Rental.find(query).select('-bookings').exec((err, foundRentals) => {

        if (err) {
            return res.status(422).send({ errors: handleError(err.errors) });
        }

        if (position && foundRentals.length === 0) {
            return res.status(422).send({ errors: [{ title: 'No Rentals Found!', detail: `There are no rentals for city ${position}` }] });
        }

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

        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        // push newRantal id to user.rentals array 
        User.update({ _id: user.id }, { $push: { rentals: newRental } }, function() {});

        return res.json(newRental);

    })


};

module.exports = {
    getRentalById: getRentalById,
    getRentalByCity: getRentalByCity,
    createRental: createRental,
}