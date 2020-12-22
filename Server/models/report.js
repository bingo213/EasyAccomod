const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var reportSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    wrongAddress:{
        type: Boolean
    },
    roomNotFound:{
        type: Boolean
    },
    notAsDescribed:{
        type: Boolean
    },
    other:{
        type: Boolean
    },
    description:{
        type: String
    }
}, {
    timestamps: true
});

var Report = mongoose.model('Report', reportSchema);

module.exports = Report;