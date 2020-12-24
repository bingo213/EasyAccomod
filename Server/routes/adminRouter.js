const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');

const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comments');
const Notification = require('../models/notification');

const { NotExtended } = require('http-errors');
const ownerRouter = require('./ownerRouter');
const Comments = require('../models/comments');
const Profile = require('../models/profile');

const adminRouter = express.Router();

adminRouter.use(bodyParser.json());

adminRouter
  .route('/getWaitingOwner')
  .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Profile.find()
      .populate('address')
      .populate({
        path: 'user',
        match: { $and: [{ user_type: 'owner' }, { active: 0 }] },
      })
      .then(owners => {
        var arr = [];
        for (let i = owners.length - 1; i >= 0; i--) {
          if (owners[i].user !== null) arr.push(owners[i]);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, owners: arr });
      });
  });

adminRouter
  .route('/getRejectOwner')
  .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Profile.find()
      .populate({ path: 'user', match: { user_type: 'ownwer', active: '2' } })
      .then(owners => {
        res.statusCode = 200;

        res.setHeader('Content-Type', 'application/json');
        res.json(owners);
      });
  });
adminRouter
  .route('/getActiveOwner')
  .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Profile.find()
      .populate({ path: 'user', match: { user_type: 'ownwer', active: '1' } })
      .then(owners => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(owners);
      });
  });

adminRouter
  .route('/changeOwnerStatus')
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    var owner = req.body.owner;
    var active = req.body.active;

    User.findById(owner).then(user => {
      if (!user.user_type.equals('owner')) {
        err.status = 401;
        err = new Error('User type not valid');
      } else {
        user.active = active;
        Notification.create({
          type: 'account',
          active: user.active,
          receive: user._id,
          object: user._id,
        });
        if (active == 1) {
          Profile.findOne({ user: owner }).then(profile => {
            profile.update = false;
            profile.save();
          });
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, owner: owner });
      }
    });
  });


  
adminRouter
.route('/getWaitingPost')
.get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  Post.find({active: 0})
    .populate('address')
    .populate('owner')
    .then(posts => {
     
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, posts: posts });
    });
});
adminRouter
  .route('/getPost')
  .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Post.find({ active: 0 })
      .populate('address')
      .populate('owner')
      .then(posts => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(posts);
      });
  });

adminRouter
  .route('/getWaitingComment')
  .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Comments.find({ active: 0 })
      .populate('author')
      .populate('post')
      .then(comments => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, comments: comments });
      });
  });

module.exports = adminRouter;
