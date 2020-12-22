const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var reasonSchema = new Schema({
    name: {
        type: String
    }
})

var reportSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    reason:[
        reasonSchema
    ],
    description:{
        type: String
    }
}, {
    timestamps: true
});

var Report = mongoose.model('Report', reportSchema);

module.exports = Report;