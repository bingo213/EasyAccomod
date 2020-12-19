const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
const searchRouter = express.Router();

searchRouter.use(bodyParser.json());

var Post = require('../models/post');

searchRouter.route('/getByAddress')
.get((req, res, next) => {
    var province ;
    Post.find({province:province})
    .populate({
        path: 'address',
        match: { province: 'ha noi'}
    })
    .then((posts) => {
        res.json(posts);
    })
})
module.exports = searchRouter;
