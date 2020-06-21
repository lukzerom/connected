const mongoose = require('mongoose');

const CarShema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    plugins: {
        type: Array
    },
    registration: {
        type: String,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('car', CarShema)