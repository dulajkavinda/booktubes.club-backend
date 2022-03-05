const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const {initial} = require('../controllers/controller.users');

router.get('/', initial);


module.exports = router;