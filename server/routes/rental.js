const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const RentalController = require('../controllers/rental');

router.get('', UserController.authMiddleware, RentalController.getRentalByCity);
router.get('/:id', UserController.authMiddleware, RentalController.getRentalById);
router.post('', UserController.authMiddleware, RentalController.createRental);
router.patch('/:id', UserController.authMiddleware, RentalController.updateRental);
router.delete('/:id', UserController.authMiddleware, RentalController.deleteRental);

module.exports = router;