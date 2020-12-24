const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
const searchRouter = express.Router();

searchRouter.use(bodyParser.json());

var Post = require('../models/post');

searchRouter.route('/getByAddress').get((req, res, next) => {
  var province;
  Post.find({ province: province })
    .populate({
      path: 'address',
      match: { province: 'ha noi' },
    })
    .then(posts => {
      res.json(posts);
    });
});
searchRouter.route('/findRoom').post((req, res, next) => {
  console.log(req.body);
  var addressDict = new Map();
  var addressArray = [];
  var postArray = [];

  //check Active and not expire
  postArray.push({ active: 1 });
  postArray.push({ expireDate: { $gt: new Date() } });

  if (req.body.province) {
    addressDict.set('province', req.body.province);
    addressArray.push({ province: req.body.province });
  }
  if (req.body.district) {
    addressDict.set('district', req.body.district);
    addressArray.push({ district: req.body.district });
  }
  if (req.body.village) {
    addressDict.set('village', req.body.village);
    addressArray.push({ village: req.body.village });
  }

  if (req.body.typeOfRoom) {
    postArray.push({ typeOfRoom: req.body.typeOfRoom });
  }

  if (req.body.typeOfPrice) {
    postArray.push({ typeOfPrice: req.body.typeOfPrice });
  }
  if (req.body.price) {
    var arr = req.body.price.split('-');
    var begin = parseInt(arr[0]);
    var end = parseInt(arr[1]);
    postArray.push({ price: { $gte: begin } });
    postArray.push({ price: { $lte: end } });
  }
  if (req.body.area) {
    var arr = req.body.area.split('-');
    var begin = parseInt(arr[0]);
    var end = parseInt(arr[1]);
    postArray.push({ area: { $gte: begin } });
    postArray.push({ area: { $lte: end } });
  }
  if (addressArray.length === 0) {
    Post.find({ $and: postArray })
      .populate('address')
      .then(posts => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(posts);
      })
      .catch(err => next(err));
  } else {
    Post.find({ $and: postArray })
      .populate({
        path: 'address',
        match: {
          $and: addressArray,
        },
      })
      .then(posts => {
        var arr = [];
        if (posts.length > 0) {
          for (let i = posts.length - 1; i >= 0; i--) {
            if (posts[i].address !== null) {
              arr.push(posts[i]);
            }
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(arr);
        } else {
          res.json(posts);
        }
      })
      .catch(err => next(err));
  }
});
module.exports = searchRouter;
