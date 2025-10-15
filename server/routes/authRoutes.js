const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Add this for debug (optional)
console.log('authController:', authController);

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
