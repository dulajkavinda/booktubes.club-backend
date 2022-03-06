const mongoose = require('mongoose');

//import schema
require('../models/users');
const User = mongoose.model('users');

//For Test
const initial = (req, res) => {
	res.send('users');
};

//Create Book Club
const signUp = (req, res) => {
	const { user_name, email, id } = req.body;

	if (!user_name || !email || !id) {
		res.send({ message: 'Missing fields', code: 400 });
	} else {
		//Validation
		const newUser = new User({
			_id: id,
			user_name: user_name,
			email: email,
		});

		//Add data
		newUser
			.save()
			.then((data) =>
				res.send({ message: 'User added successfully', code: 200 }),
			)
			.catch((err) => res.send({ message: err, code: 400 }));
	}
};

//Update readings
const updateReadings = (req, res) => {
	const { club, book } = req.body;
	const { id } = req.params;

	if (!club || !book || !id) {
		res.send({ message: 'Missing parameters', code: 400 });
	} else {
		const bookRec = {
			club_id: club,
			book_id: book,
			startedAt: new Date(),
			percentage: 0,
		};

		User.updateOne({ _id: id }, { $push: { current_readings: bookRec } })
			.then((data) =>
				res.send({ message: 'Reading added successfully', code: 200 }),
			)
			.catch((err) => res.send({ message: err, code: 400 }));
	}
};

//Update readings
const updateReadingPrecentage = (req, res) => {
	const { club, book, percentage } = req.body;
	const { id } = req.params;

	console.log(club);
	console.log(percentage);

	if (!id || !club || !book || !percentage) {
		res.send({ message: 'Missing parameters', code: 400 });
	} else {
		User.updateOne(
			{
				_id: id,
				current_readings: { $elemMatch: { club_id: club, book_id: book } },
			},
			{'current_readings.$.percentage': percentage},
		)
			.then((data) => {
				console.log(data);
				res.send({
					message: 'Rading progress updated successfully',
					code: 200,
				});
			})
			.catch((err) => res.send({ message: err, code: 400 }));
	}
};

//Get Users
const getUsers = (req, res) => {
	User.find({})
		.then((data) =>
			res.send({ message: 'Records Found', data: data, code: 200 }),
		)
		.catch((err) => res.send({ message: err, code: 400 }));
};

//Get user by id
const getUserById = (req, res) => {
	User.find({ _id: req.params.id })
		.then((data) =>
			res.send({ message: 'Records Found', data: data, code: 200 }),
		)
		.catch((err) => res.send({ message: err, code: 400 }));
};

//Combine reading data with book data
const getCurrentReadingsDetails = (req, res) => {
	User.aggregate([
		{
			$match: { _id: req.params.id },
		},
		{
			$unwind: '$current_readings',
		},
		{
			$lookup: {
				from: '$books',
				localField: '$current_readings.book_id',
				foreignField: '$_id',
				as: 'book_data',
			},
			
		},

	]).then(data => {
		res.send({ message: 'Records Found', data: data, code: 200 });
	}).catch(err => {
		res.send({ message: err, code: 400 });
	})
}

module.exports = {
	initial,
	signUp,
	updateReadings,
	updateReadingPrecentage,
	getUsers,
	getUserById,
	getCurrentReadingsDetails
};
