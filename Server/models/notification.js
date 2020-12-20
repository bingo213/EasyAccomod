const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var notificationSchema = new Schema({
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type:{
        type: String,
        enum: ['post', 'account']
    },
    active:{
        type: Number
    },
    object:{
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Notification', notificationSchema);