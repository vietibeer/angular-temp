const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');

router.get('', (req, res) => {
    Rental.find({}, (err, foundRentals) => {
        if (err) return handleError(res, 422, 'Rental Error', 'Could not find rental!');
        res.json(foundRentals);
    });
});

router.get('/:rentalId', (req, res) => {
    // Rental.findById(req.params.rentalId, '-shared').exec((err, foundRentals) => {
    Rental.findById(req.params.rentalId).exec((err, foundRentals) => {
        if (err) return handleError(res, 422, 'Rental Error', 'Could not find rental!');
        res.json(foundRentals);
    });
})

function handleError(res, status, title, detail) {
    return res.status(status).send({
        errors: [
            { title: title, detail: detail }
        ]
    });
}

module.exports = router;