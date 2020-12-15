var mongoose = require('mongoose');
var Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
   user_type: {
       type: String,
       required: true
   },
   active:{
       type: Boolean
   }
}, {timestamps: true});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);