const mongoose = require('mongoose');

const UserShema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    ratingAsDriver: {
        type: Array,
    },
    ratingAsStation: {
        type: Array,
    },
    electrons: {
        type: Number,
        default: 100
    },
    phone: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', UserShema)