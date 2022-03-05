const mongoose = require('mongoose');

const Users = mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},
	user_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	current_readings: {
		type: Array,
		default: [],
	},
});

mongoose.model('users', Users);
