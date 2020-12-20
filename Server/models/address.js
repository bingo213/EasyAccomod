const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Address = new Schema({
    province:{
        type: String,
        required: true
    },
    district:{
        type: String,
        required: true
    },
    village:{
        type: String,
        required: true
    },
    street:{
        type: String,
        required: true
    },
    houseNumber:{
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

var Address = mongoose.model('Address', Address);

module.exports = Address;