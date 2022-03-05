const mongoose = require('mongoose');

require('../models/books');
const Book = mongoose.model('books');

//For Test
const initial = (req, res) => {
	res.send('books');
};

const addNewBook = (req, res) => {
	const { name, description, cover } = req.body;

	if (!name || !description) {
		res.send({ message: 'Missing fields', code: 400 });
	} else {
		//Validation
		const newBook = new Book({
			name: name,
			description: description,
			cover: cover,
		});

		//Add data
		newBook
			.save()
			.then((data) =>
				res.send({ message: 'New Book added successfully', code: 200 }),
			)
			.catch((err) => res.send({ message: err, code: 400 }));
	}
};

const getBooks = (req, res) => {
	Book.find({})
		.then((books) => {
			res.send({ message: 'Records Found', data: books, code: 200 });
		})
		.catch((err) => {
			res.send({ message: err, code: 400 });
		});
};

const getBooksById = (req, res) => {
	Book.find({ _id: req.params.id })
		.then((books) => {
			res.send({ message: 'Records Found', data: books, code: 200 });
		})
		.catch((err) => {
			res.send({ message: err, code: 400 });
		});
};

module.exports = {
	initial,
	addNewBook,
	getBooks,
	getBooksById,
};
