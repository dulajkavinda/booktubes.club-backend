const mongoose = require('mongoose');

//import schema
require('../models/clubs');
const Club = mongoose.model('clubs');

//For Test
const initial = (req, res) => {
	res.send('clubs');
};

//Create Book Club
const createBookClub = (req, res) => {
	const { name, type, currency, desc, img } = req.body;

	if (!name || !type || !currency || !desc) {
		res.send({ message: 'Missing fields', code: 400 });
	} else {
		//Validation
		const newClub = new Club({
			club_name: name,
			category: currency,
			clubType: type === 'Paid' ? true : false,
			description: desc,
			img_url: img,
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
			description: description,
			user: user,
		};

		//Add data
		Club.updateOne({ _id: id }, { $push: { posts: newPost } })
			.then((data) => {
				res.send({ message: 'Post created successfully', code: 200 });
			})
			.catch((err) => res.send({ message: err, code: 400 }));
	}
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

const getAllClubs = (req, res) => {
	Club.find({})
		.then((clubs) => {
			res.send({ message: 'Records Found', data: clubs, code: 200 });
		})
		.catch((err) => res.send({ message: err, code: 400 }));
};

const getAllClubsByID = (req, res) => {
	const { id } = req.params;
	Club.find({ _id: id })
		.then((clubs) => {
			res.send({ message: 'Records Found', data: clubs, code: 200 });
		})
		.catch((err) => res.send({ message: err, code: 400 }));
};

module.exports = {
	initial,
	createBookClub,
	updateMembers,
	updateMemberCount,
	getAllClubs,
	getAllClubsByID,
	createPost,
};
