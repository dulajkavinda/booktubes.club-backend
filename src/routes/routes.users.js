const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const {
	initial,
	signUp,
	updateReadingPrecentage,
	updateReadings,
	getUsers,
	getUserById,
} = require('../controllers/controller.users');

router.get('/', initial);
//SignUp
router.post('/signUp', signUp);
//Update Reading
router.put('/updateReading/:id', updateReadings);
//Update Reading Precentage
router.put('/updateReadingPrecentage/:id', updateReadingPrecentage);
//Get All Users
router.get('/getUsers', getUsers);
//Get User by Id
router.get('/getUserById/:id', getUserById);

module.exports = router;
