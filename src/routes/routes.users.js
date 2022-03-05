const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const {initial, signUp} = require('../controllers/controller.users');

router.get('/', initial);
//SignUp
router.post('/', signUp);


module.exports = router;