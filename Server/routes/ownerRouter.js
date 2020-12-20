const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var passport = require("passport");

const User = require("../models/user");
const Profile = require("../models/profile");
const Address = require("../models/address");
const Post = require("../models/post");
const { NotExtended } = require("http-errors");
const { authenticate } = require("passport");
const auth = require("../authenticate");

const ownerRouter = express.Router();

ownerRouter.use(bodyParser.json());

ownerRouter.route("/signup").post(
  (req, res, next) => {
    var addressForm = {};
    var profileForm = {};

    addressForm.houseNumber = req.body.houseNumber;
    addressForm.street = req.body.street;
    addressForm.village = req.body.village;
    addressForm.district = req.body.district;
    addressForm.province = req.body.province;

    profileForm.fullname = req.body.fullname;
    profileForm.email = req.body.email;
    profileForm.identity = req.body.identity;
    profileForm.phoneNumber = req.body.phoneNumber;
    profileForm.active = 0;
    profileForm.update = true;

    Address.create(addressForm).then(
      (address) => {
        User.register(
          new User({
            username: req.body.username,
            user_type: "owner",
            active: 0,
          }),
          req.body.password,
          (err, user) => {
            if (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.json({ err: err });
            } else {
              user.save((err, user) => {
                if (err) {
                  res.statusCode = 500;
                  res.setHeader("Content-Type", "application/json");
                  res.json({ err: err });
                  return;
                }
                passport.authenticate("local")(req, res, () => {
                  profileForm.user = user._id;
                  profileForm.address = address._id;
                  Profile.create(profileForm)
                    .then(
                      (profile) => {
                        // Profile.findById(profile._id)
                        //     .populate('user')
                        //     .populate('address')
                        //     .then((profile) => {
                        //         res.statusCode = 200;
                        //         res.setHeader('Content-Type', 'application/json');
                        //         res.json(profile);
                        //     })
                      },
                      (err) => {
                        err.message = "Tên tài khoản đã tồn tại";
                        next(err);
                      }
                    )
                    .catch((err) => next(err));

                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json({
                    success: true,
                    status: "Registration Owner Successful!",
                    user: user,
                  });
                });
              });
            }
          }
        );
      },
      (err) => next(err)
    );
  },
  (err) => {
    return next(err);
  }
);

ownerRouter
  .route("/:ownerId/activePost")
  .get(auth.verifyUser, auth.verifyOwner, (req, res, next) => {
    User.findById(req.params.ownerId)
      .then((user) => {
        Post.find({
          $and: [
            { owner: req.params.ownerId },
            { active: 1 },
            { expireDate: { $gte: new Date() } },
          ],
        })
          .populate("address")
          .sort("-createdAt")
          .then(
            (posts) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json({ success: true, posts: posts });
            },
            (err) => next(err)
          );
      })
      .catch((err) => next(err));
  });

ownerRouter
  .route("/:ownerId/waitingPost")
  .get(auth.verifyUser, auth.verifyOwner, (req, res, next) => {
    User.findById(req.params.ownerId).then((user) => {
      Post.find({ $and: [{ owner: req.params.ownerId }, { active: 0 }] })
        .populate("address")
        .sort("-createdAt")
        .then((posts) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, posts: posts });
        });
    });
  });

ownerRouter
  .route("/:ownerId/rejectPost")
  .get(auth.verifyUser, auth.verifyOwner, (req, res, next) => {
    User.findById(req.params.ownerId).then((user) => {
      Post.find({ $and: [{ owner: req.params.ownerId }, { active: 2 }] })
        .populate("address")
        .sort("-createdAt")
        .then((posts) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, posts: posts });
        });
    });
  });

ownerRouter
  .route("/:ownerId/expirePost")
  .get(auth.verifyUser, auth.verifyOwner, (req, res, next) => {
    User.findById(req.params.ownerId).then((user) => {
      Post.find({ expireDate: { $lt: new Date() } })
        .populate("address")
        .sort('-createdAt')
        .then((posts) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, posts: posts });
        });
    });
  });
module.exports = ownerRouter;
