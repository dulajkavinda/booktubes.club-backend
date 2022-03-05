const mongoose = require('mongoose');

const Clubs = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

mongoose.model('books', Clubs);