var mongoose = require('mongoose');
var Schema = mongoose.Schema

var Profile = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    fullname: {
        type: String,
        require: true
    },
    email:{
        type: String
    },
    phoneNumber: {
        type: String
    },
    identity:{
        type: String
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    active: {
        type: Number
    },
    update: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Profile', Profile);