const mongoose = require('mongoose');

const Clubs = mongoose.Schema({
    club_name: {
        type: String,
        required: true
    },
    category: {
        type: Array,
        required: true
    },
    clubType: {
        type:Boolean,
        default:false
    },
    description: {
        type: String,
        required: true
    },
    img_url: {
        type: String,
        default: ''
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