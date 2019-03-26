const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.get('/auth', UserController.auth);

router.get('/register', UserController.register)

module.exports = router;