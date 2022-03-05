const User = require('../models/users');

//For Test
const initial = (req, res) => {
	res.send('users');
};

//Create Book Club
const signUp = (req, res) => {
	const { user_name, email } = req.body;

	if (!user_name || !email) {
		console.log('Missing fields');
	} else {
		//Validation
		const newUser = new Club({
			user_name: user_name,
			email: email,
		});

		//Add data
		newUser
			.save()
			.then(res.send({ message: 'User added successfully', code: 200 }))
			.catch((err) => console.log(err));
	}
};

//Update readings
const updateReadings = (req, res) => {
	const { club, book, user } = req.body;

	if (user) {
		console.log('Missing user id');
	} else {
		const bookRec = {
			club_id: club,
			book_id: book,
			percentage: 0,
		};

		Club.updateOne({ _id: user }, { $push: { current_readings: bookRec } })
			.then(res.send({ message: 'Reading added successfully', code: 200 }))
			.catch((err) => console.log(err));
	}
};

//Update readings
const updateReadingPrecentage = (req, res) => {
	const { club, book, precentage } = req.body;

	if (user) {
		console.log('Missing user id');
	} else {
		Club.updateOne(
			{ current_readings: { $elemMatch: { club_id: club, book_id: book } } },
			{ $set: { 'current_readings.percentage': precentage } },
		)
			.then(res.send({ message: 'Rading progress updated successfully', code: 200 }))
			.catch((err) => console.log(err));
	}
};

module.exports = {
	initial,
	signUp,
    updateReadings,
    updateReadingPrecentage
};
