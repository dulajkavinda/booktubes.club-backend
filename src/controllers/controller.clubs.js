//import schema
const Club = require('../models/clubs');

//For Test
const initial = (req, res) => {
	res.send('clubs');
};

//Create Book Club
const createBookClub = (req, res) => {
	const { name, type, currency, desc, img } = req.body;

	if (!name || !type || !currency || !desc) {
		console.log('Missing fields');
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
			.then(res.send({ message: 'Club created successfully', code: 200 }))
			.catch((err) => console.log(err));
	}
};

//Update members of  Book Club
const updateMembers = (req, res) => {
	const { user } = req.body;

	if (user) {
		console.log('Missing user id');
	} else {
        Club.updateOne({ _id: user }, { $push: { members: user } })
			.then(res.send({ message: 'Club created successfully', code: 200 }))
			.catch((err) => console.log(err));
	}
};

const updateMemberCount = (req, res) => {
	const { user } = req.body;

	if (user) {
        Club.updateOne({ _id: user }, { $inc: { member_count: 1 } })
			.then(res.send({ message: 'Club created successfully', code: 200 }))
			.catch((err) => console.log(err));
	}
};

module.exports = {
	initial,
	createBookClub,
    updateMembers
};
