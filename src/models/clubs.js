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
    },
    posts:{
        type:Array,
        default:[]
    },
    polls:{
        type:Array,
        default:[]
    }
}, {timestamps: true});

mongoose.model('clubs', Clubs);