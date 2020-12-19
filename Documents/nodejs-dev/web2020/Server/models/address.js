const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Address = new Schema({
    province:{
        type: String
    },
    district:{
        type: String
    },
    village:{
        type: String
    },
    street:{
        type: String
    },
    houseNumber:{
        type: Number
    }
}, {
    timestamps: true
});

var Address = mongoose.model('Address', Address);

module.exports = Address;