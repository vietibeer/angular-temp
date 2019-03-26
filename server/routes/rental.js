const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const UserController = require('../controllers/user'); 

router.get('/secret', UserController.authMiddleware, (req, res) => {
    res.json("secret");
});

router.get('', (req, res) => {
    Rental.find({}, (err, foundRentals) => {
        if (err) return res.status(422).send({ errors: handleError(err.errors) });
        res.json(foundRentals);
    });
});

router.get('/:rentalId', (req, res) => {
    // Rental.findById(req.params.rentalId, '-shared').exec((err, foundRentals) => {
    Rental.findById(req.params.rentalId).exec((err, foundRentals) => {
        if (err) return res.status(422).send({ errors: handleError(err.errors) });
        res.json(foundRentals);
    });
});

module.exports = router;