const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const {
	initial,
	addNewBook,
	getBooks,
	getBooksById,
} = require('../controllers/controllers.books');

router.get('/', initial);
//Add Book
router.post('/addNewBook', addNewBook);
//Get Books
router.get('/getBooks', getBooks);
//Get Books By Id
router.get('/getBooksById/:id', getBooksById);

module.exports = router;
