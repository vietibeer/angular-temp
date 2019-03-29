const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const UserController = require('../controllers/user');

router.get('/secret', UserController.authMiddleware, (req, res) => {
    res.json("secret");
});

router.get('', UserController.authMiddleware, (req, res) => {
    Rental.find({}, '-bookings', (err, foundRentals) => { // or use method find({}).select('-bookings')
        if (err) return res.status(422).send({ errors: handleError(err.errors) });
        res.json(foundRentals);
    });
});

router.get('/:rentalId', UserController.authMiddleware, (req, res) => {
    Rental.findById(req.params.rentalId)
        .populate('bookings', 'startAt endAt -_id')
        .populate('user', 'username -_id')
        .exec((err, foundRentals) => {
            if (err) return res.status(422).send({ errors: handleError(err.errors) });
            res.json(foundRentals);
        });
});

module.exports = router;