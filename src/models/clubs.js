const mongoose = require('mongoose');

const Clubs = mongoose.Schema({
    club_name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img_url: {
        type: String,
        required: true
    },
    member_count: {
        type: Number,
        default: 0
    },
    members: {
        type: Array,
        default: []
    }
})

mongoose.model('clubs', Clubs);