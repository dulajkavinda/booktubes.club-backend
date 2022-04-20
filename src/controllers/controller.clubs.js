const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

//import schema
require('../models/clubs');
const Club = mongoose.model('clubs');

//For Test
const initial = (req, res) => {
	res.send('clubs');
};

//Create Book Club
const createBookClub = (req, res) => {
	const { name, type, currency, desc, img, admin } = req.body;

	if (!name || !type || !currency || !desc || !admin) {
		res.send({ message: 'Missing fields', code: 400 });
	} else {
		//Validation
		const newClub = new Club({
			club_name: name,
			category: currency,
			clubType: type === 'Paid' ? true : false,
			description: desc,
			img_url: img,
			admin: admin.uid,
			polls: [],
		});

		//Add data
		newClub
			.save()
			.then((data) =>
				res.send({ message: 'Club created successfully', code: 200 }),
			)
			.catch((err) => res.send({ message: err, code: 400 }));
	}
};

//Create Post
const createPost = (req, res) => {
	const { description, user } = req.body;
	const { id } = req.params;

	if (!id || !description || !user) {
		res.send({ message: 'Missing fields', code: 400 });
	} else {
		//Validation
		const newPost = {
			postId: uuidv4(),
			description: description,
			user: user,
			upvotes: 0,
			downvotes: 0,
			upvoters: [],
			downvoters: [],
			createdAt: new Date(),
		};

		//Add data
		Club.updateOne({ _id: id }, { $push: { posts: newPost } })
			.then((data) => {
				res.send({ message: 'Post created successfully', code: 200 });
			})
			.catch((err) => res.send({ message: err, code: 400 }));
	}
};

//Upvote post
const upvotePost = (req, res) => {
	const { id } = req.params;
	const { postId } = req.body;
	Club.updateOne(
		{ _id: id, posts: { $elemMatch: { postId: postId } } },
		{ $inc: { 'posts.$.upvotes': 1 } },
	)
		.then((data) =>
			res.send({
				message: 'Upvote updated successfully',
				data: data,
				code: 200,
			}),
		)
		.catch((err) => res.send({ message: err, code: 400 }));
};

//Downvote post
const downvotePost = (req, res) => {
	const { id } = req.params;
	const { postId } = req.body;
	Club.updateOne(
		{ _id: id, posts: { $elemMatch: { postId: postId } } },
		{ $inc: { 'posts.$.downvotes': 1 } },
	)
		.then((data) =>
			res.send({ message: 'Downvote updated successfully', code: 200 }),
		)
		.catch((err) => res.send({ message: err, code: 400 }));
};

//Update upvoters
const updateUpvoters = (req, res) => {
	const { id } = req.params;
	const { postId, user } = req.body;

	Club.updateOne(
		{ _id: id, posts: { $elemMatch: { postId: postId } } },
		{ $push: { 'posts.$.upvoters': user } },
	)
		.then((data) =>
			res.send({ message: 'Upvoters updated successfully', code: 200 }),
		)
		.catch((err) => res.send({ message: err, code: 400 }));
};

//Update downvoters
const updateDownvoters = (req, res) => {
	const { id } = req.params;
	const { postId, user } = req.body;
	Club.updateOne(
		{ _id: id, posts: { $elemMatch: { postId: postId } } },
		{ $push: { 'posts.$.downvoters': user } },
	)
		.then((data) =>
			res.send({ message: 'Downvoters updated successfully', code: 200 }),
		)
		.catch((err) => res.send({ message: err, code: 400 }));
};

//Update members of  Book Club
const updateMembers = (req, res) => {
	const { user } = req.body;
	const { id } = req.params;

	if (!user) {
		res.send({ message: 'Missing user id', code: 400 });
	} else {
		Club.updateOne({ _id: id }, { $push: { members: user } })
			.then((data) =>
				res.send({ message: 'Club member added successfully', code: 200 }),
			)
			.catch((err) => res.send({ message: err, code: 400 }));
	}
};

//Update number of members
const updateMemberCount = (req, res) => {
	const { user } = req.body;
	const { id } = req.params;

	if (!user) {
		Club.updateOne({ _id: id }, { $inc: { member_count: 1 } })
			.then((data) =>
				res.send({ message: 'Member count updated successfully', code: 200 }),
			)
			.catch((err) => res.send({ message: err, code: 400 }));
	}
};

//Get All book clubs
const getAllClubs = (req, res) => {
	Club.find({})
		.then((clubs) => {
			res.send({ message: 'Records Found', data: clubs, code: 200 });
		})
		.catch((err) => res.send({ message: err, code: 400 }));
};

//Get book club by id
const getAllClubsByID = (req, res) => {
	const { id } = req.params;
	Club.find({ _id: id })
		.then((clubs) => {
			res.send({ message: 'Records Found', data: clubs, code: 200 });
		})
		.catch((err) => res.send({ message: err, code: 400 }));
};

//Delete book club by id
const deleteClub = (req, res) => {
	const { id } = req.params;
	Club.deleteOne({ _id: id })
		.then((data) =>
			res.send({ message: 'Club deleted successfully', code: 200 }),
		)
		.catch((err) => res.send({ message: err, code: 400 }));
};

//Create voting poll
const createPoll = (req, res) => {
	const { id } = req.params;
	const { books, deadline } = req.body;

	if (!id || !books || !deadline) {
		res.send({ message: 'Missing fields', code: 400 });
	} else {
		let votes = [];

		books.map((element, i) => {
			console.log(element);
			votes[i] = { book: new mongoose.Types.ObjectId(element), numOfVotes: 0 };
		});

		const newPoll = {
			id: uuidv4(),
			books: books,
			votes: votes,
			voters: [],
			deadline: deadline,
			lock: false,
		};

		Club.updateOne({ _id: id }, { $push: { polls: newPoll } })
			.then((data) =>
				res.send({ message: 'Poll created successfully', code: 200 }),
			)
			.catch((err) => res.send({ message: err, code: 400 }));
	}
};

//Update votings in voting poll
const updatePoll = (req, res) => {
	const { id } = req.params;
	const { pollId, book } = req.body;

	if (!id || !pollId) {
		res.send({ message: 'Missing fields', code: 400 });
	} else {
		Club.updateOne(
			{
				$and: [
					{ _id: id },
					{ polls: { $elemMatch: { id: pollId } } },
				],
			},
			{ $inc: { 'votes.$.numOfVotes': 1 } },
		)
			.then((data) =>
				res.send({
					message: 'Poll updated successfully',
					data: data,
					code: 200,
				}),
			)
			.catch((err) => res.send({ message: err, code: 400 }));
		// Club.findOne({$and: [
		// 			{_id: id},
		// 			{polls: { $elemMatch: { id: pollId} }}
		// ]},
		// 		).then((club) => {
		// 	res.send({ message: 'Poll updated successfully',data:club, code: 200 });
		// }).catch((err) => res.send({ message: err, code: 400 }));
	}
};

//Update voters in voting poll
const updatePollVoters = (req, res) => {
	const { id } = req.params;
	const { pollId, user } = req.body;

	if (!id || !pollId || !user) {
		res.send({ message: 'Missing fields', code: 400 });
	} else {
		Club.updateOne(
			{
				$and: [
					{ _id: id },
					{ polls: { $elemMatch: { id: pollId } } }
				],
			},
			{ $push: { 'polls.$.voters': user } },
		)
			.then((data) =>
				res.send({ message: 'Poll updated successfully', code: 200 }),
			)
			.catch((err) => res.send({ message: err, code: 400 }));
	}
};

//Get Books from list of id's
const getBooksFromIdList = (req, res) => {
	const { ids } = req.body;

	if (!ids) {
		res.send({ message: 'Missing ids', code: 400 });
	} else {
		Book.find({ _id: { $in: ids } })
			.then((books) => {
				res.send({ message: 'Records Found', data: books, code: 200 });
			})
			.catch((err) => res.send({ message: err, code: 400 }));
	}
};

//Update deadline of voting poll
const updatePollDeadline = (req, res) => {
	const { id } = req.params;
	const { pollId, deadline } = req.body;

	if (!id || !pollId || !deadline) {
		res.send({ message: 'Missing fields', code: 400 });
	} else {
		Club.updateOne(
			{ _id: id, polls: { $elemMatch: { id: pollId } } },
			{ 'polls.$.deadline': deadline },
		)
			.then((data) =>
				res.send({ message: 'Poll updated successfully', code: 200 }),
			)
			.catch((err) => res.send({ message: err, code: 400 }));
	}
};

//Check if poll is locked
const checkPollLock = (req, res) => {
	const { id } = req.params;
	const { pollId } = req.body;

	if (!id || !pollId) {
		res.send({ message: 'Missing fields', code: 400 });
	} else {
		Club.findOne({ _id: id, polls: { $elemMatch: { id: pollId } } })
			.then((data) => {
				if (data.polls[0].lock) {
					res.send({ message: 'Poll locked', data: true, code: 200 });
				} else {
					//Update poll lock
					Club.updateOne(
						{
							_id: id,
							polls: { $elemMatch: { id: pollId } },
							deadline: { $gt: Date.now() },
						},
						{ 'polls.$.lock': true },
					)
						.then((data) => {
							res.send({ message: 'Poll locked', data: true, code: 200 });
						})
						.catch((err) => res.send({ message: err, code: 400 }));
				}
			})
			.catch((err) => res.send({ message: err, code: 400 }));
	}
};

//Check every poll if it's locked
const checkPollsLock = (req, res) => {
	const { id } = req.params;

	if (!id) {
		res.send({ message: 'Missing fields', code: 400 });
	} else {
		Club.findOne({ _id: id })
			.then((data) => {
				let pollsLocked = [];
				data.polls.map((element, i) => {
					if (element.deadline > Date.now()) {
						pollsLocked.push(element.id);
					} else {
						//Update poll lock
						Club.updateOne(
							{
								_id: id,
								polls: { $elemMatch: { id: pollId } },
								deadline: { $gt: Date.now() },
							},
							{ 'polls.$.lock': true },
						)
							.then((data) => {
								res.send({
									message: `Poll locked ${data.polls.$._id}`,
									data: true,
									code: 200,
								});
							})
							.catch((err) => res.send({ message: err, code: 400 }));
					}
				});

				res.send({ message: 'Polls locked', data: pollsLocked, code: 200 });
			})
			.catch((err) => res.send({ message: err, code: 400 }));
	}
};

module.exports = {
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
	checkPollLock,
	checkPollsLock
};
