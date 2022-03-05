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

module.exports = {
	initial,
	signUp,
};
