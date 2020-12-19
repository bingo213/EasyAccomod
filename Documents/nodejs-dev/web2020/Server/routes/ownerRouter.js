const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var passport = require('passport');

const User = require('../models/user');
const Profile = require('../models/profile');
const Address = require('../models/address');
const { NotExtended } = require('http-errors');
const { authenticate } = require('passport');
const auth = require('../authenticate');

const ownerRouter = express.Router();

ownerRouter.use(bodyParser.json());

ownerRouter.route('/signup')
    .post((req, res, next) => {
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

        Address.create(addressForm)
            .then((address) => {
                User.register(new User({ username: req.body.username, user_type: 'owner', active: 0 }), req.body.password, (err, user) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ err: err });
                    }
                    else {
                        user.save((err, user) => {
                            if (err) {
                                res.statusCode = 500;
                                res.setHeader('Content-Type', 'application/json');
                                res.json({ err: err });
                                return;
                            }
                            passport.authenticate('local')(req, res, () => {
                                profileForm.user = user._id;
                                profileForm.address = address._id;
                                Profile.create(profileForm)
                                    .then((profile) => {
                                        // Profile.findById(profile._id)
                                        //     .populate('user')
                                        //     .populate('address')
                                        //     .then((profile) => {
                                        //         res.statusCode = 200;
                                        //         res.setHeader('Content-Type', 'application/json');
                                        //         res.json(profile);
                                        //     })
                                    }, (err) => next(err))
                                    .catch((err) => next(err));

                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json({ success: true, status: 'Registration Owner Successful!', user: user });
                            })
                        });
                    }
                })

            }, (err) => next(err))
    }, (err) => { return next(err); })


module.exports = ownerRouter;