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
	createPost,
	deleteClub,
	updateDownvoters,
	updateUpvoters,
	downvotePost,
	upvotePost,
	createPoll,
	updatePoll,
	updatePollVoters,
	getBooksFromIdList,
	updatePollDeadline,
	checkPollLock
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
//Delete club
router.delete('/deleteClub/:id', deleteClub);
//Update downvoters
router.put('/updateDownvoters/:id', updateDownvoters);
//Update upvoters
router.put('/updateUpvoters/:id', updateUpvoters);
//Downvote post
router.put('/downvotePost/:id', downvotePost);
//Upvote post
router.put('/upvotePost/:id', upvotePost);
//Create poll
router.post('/createPoll/:id', createPoll);
//Update poll
router.put('/updatePoll/:id', updatePoll);
//Update poll voters
router.put('/updatePollVoters/:id', updatePollVoters);
//Get books from id list
router.get('/getBooksFromIdList/:id', getBooksFromIdList);	
//Update poll deadline
router.put('/updatePollDeadline/:id', updatePollDeadline);
//Check if poll is locked
router.put('/checkPollLock/:id', checkPollLock);

module.exports = router;
