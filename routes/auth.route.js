const express = require('express');
const authController = require('../controllers/auth.controller');


const router = express();

router.post('/login', authController.login);

module.exports = router;