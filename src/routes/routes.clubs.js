const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const {initial, createBookClub} = require('../controllers/controller.clubs');

router.get('/', initial);

//Route for book club creation
router.post('/', createBookClub)

module.exports = router;