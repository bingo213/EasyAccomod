const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');

const Profile = require('../models/profile');
const User = require('../models/user');
const { NotExtended } = require('http-errors');
const Address = require('../models/address');

const profileRouter = express.Router();

profileRouter.use(bodyParser.json());

//multer
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/avatar');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + file.originalname);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG)$/)) {
    return cb(new Error('You can upload only image files!'), false);
  }
  cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: imageFileFilter });

profileRouter
  .route('/')
  .get(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('get operation not supported on /profile/');
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    if (req.body != null) {
      req.body.user = req.user._id;
      req.body.update = 1;
      req.body.user = req.user;
      Profile.create(req.body)
        .then(
          profile => {
            Profile.findById(profile._id)
              .populate('user')
              .populate('address')
              .then(profile => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ profile: profile, success: true });
              });
          },
          err => next(err)
        )
        .catch(err => next(err));
    } else {
      err = new Error('Profile not found in request body');
      err.status = 404;
      return next(err);
    }
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /profile/');
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('delete operation not supported on /profile/');
  });

profileRouter
  .route('/:profileId')
  .get(authenticate.verifyUser, (req, res, next) => {
    Profile.findById(req.params.profileId)
      .populate('user')
      .populate('address')
      .then(
        profile => {
          if (
            !(
              profile.user.equals(req.user._id) || req.user.user_type == 'admin'
            )
          ) {
            res.statusCode = 404;
            res.end('You are not get another profile');
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(profile);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /profile/' + req.params.profileId);
  })
  .put(authenticate.verifyUser, upload.single('avatar'), (req, res, next) => {
    console.log('Body is: ', req.body);
    console.log(req.file);
    Profile.findById(req.params.profileId)
      .then(
        profile => {
          if (profile != null) {
            if (profile.update) {
              if (!profile.user.equals(req.user._id)) {
                var err = new Error(
                  'You are not authorized to update this profile!'
                );
                err.status = 403;
                return next(err);
              }

              //upload address
              Address.findById(profile.address).then(address => {
                if (req.body.houseNumber)
                  address.houseNumber = req.body.houseNumber;
                if (req.body.street) address.street = req.body.street;
                if (req.body.village) address.village = req.body.village;
                if (req.body.district) address.district = req.body.district;
                if (req.body.province) address.province = req.body.province;

                address.save();
              });

              //update profile
              if (req.body.fullname) profile.fullname = req.body.fullname;
              if (req.body.phoneNumber)
                profile.phoneNumber = req.body.phoneNumber;
              if (req.body.identity) profile.identity = req.body.identity;
              if (req.body.email) profile.email = req.body.email;
              if (req.user.user_type === 'owner') {
                User.findById(req.user._id).then(user => {
                  user.active = 0;
                  user.save();
                });
              }
              profile.update = true;

              //upload images
              if (req.file) {
                profile.avatar = req.file.path;
              }

              profile.save();

              Profile.findById(profile._id)
                .populate('address')
                .then(profile => {
                  res.statusCode = 200;
                  res.json({
                    success: true,
                    message: 'Congralation! Bạn đã thay đổi thành công!',
                  });
                });
            } else {
              err = new Error('Not allow to update');
            }
          } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, message: 'Not found profile' });
          }
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    // Address.findById(req.params.addressId)
    //     .then((address) => {
    //         if (address != null) {
    //             Address.findByIdAndRemove(req.params.addressId)
    //                 .then((resp) => {
    //                     res.statusCode = 200;
    //                     res.setHeader('Content-Type', 'application/json');
    //                     res.json(resp);
    //                 }, (err) => next(err))
    //                 .catch((err) => next(err));
    //         }
    //         else {
    //             err = new Error('profile ' + req.params.addressId + ' not found');
    //             err.status = 404;
    //             return next(err);
    //         }
    //     }, (err) => next(err))
    //     .catch((err) => next(err));
  });
module.exports = profileRouter;
