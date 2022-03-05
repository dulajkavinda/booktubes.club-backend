const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const {initial, createBookClub, updateMembers, updateMemberCount} = require('../controllers/controller.clubs');

router.get('/', initial);

//Route for book club creation
router.post('/', createBookClub)
//Update members of  Book Club
router.post('/updateMembers', updateMembers)
//Update member count of  Book Club
router.post('/updateMemberCount', updateMemberCount)

module.exports = router;