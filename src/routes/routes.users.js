const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const {initial, signUp, updateReadingPrecentage, updateReadings} = require('../controllers/controller.users');

router.get('/', initial);
//SignUp
router.post('/', signUp);
//Update Reading
router.put('/updateReading', updateReading);
//Update Reading Precentage
router.put('/updateReadingPrecentage', updateReadingPrecentage);

module.exports = router;