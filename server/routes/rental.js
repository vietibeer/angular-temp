const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const RentalController = require('../controllers/rental');

router.get('', UserController.authMiddleware, RentalController.getRentalByCity);
router.get('/:rentalId', UserController.authMiddleware, RentalController.getRentalById);
router.post('', UserController.authMiddleware, RentalController.createRental);

module.exports = router;