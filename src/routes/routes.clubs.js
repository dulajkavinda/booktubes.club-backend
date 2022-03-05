const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const {
	initial,
	createBookClub,
	updateMembers,
	updateMemberCount,
	getAllClubs,
	getAllClubsByID,
	createPost
} = require('../controllers/controller.clubs');

router.get('/', initial);

//Route for book club creation
router.post('/createBookClub', createBookClub);
//Create Post
router.post('/createPost/:id', createPost);
//Update members of  Book Club
router.put('/updateMembers/:id', updateMembers);
//Update member count of  Book Club
router.put('/updateMemberCount/:id', updateMemberCount);
//Get all clubs
router.get('/getAllClubs', getAllClubs);
//Get all clubs by id
router.get('/getAllClubsByID/:id', getAllClubsByID);

module.exports = router;
