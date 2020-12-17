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

profileRouter.route('/')
    .get(authenticate.verifyUser, (req, res, next) => {
        profile.find({user: req.user._id})
            .populate('address')
            .then((profile) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({profile: profile});
            }, (err) => next(err))
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        // if (req.body.user == null) {
        //     if (req.user._id)
        //         req.body.user = req.user._id;
        //     else {
        //         err = new Error('You not login');
        //         err.status = 403;
        //         return next(err);
        //     }
        // }
        if (req.body != null) {
            req.body.user = req.user._id
            var user = User.findById(req.user._id);
            if (user.user_type == 'rental')
                req.body.active = true;
            else if (user.user_type == 'owner')
                req.body.active = false;
            req.body.update = !req.body.active;
            Profile.create(req.body)
                .then((profile) => {
                    Profile.findById(profile._id)
                        .populate('user')
                        .populate('address')
                        .then((profile) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({profile: profile, success: true});
                        })
                }, (err) => next(err))
                .catch((err) => next(err));
        }
        else {
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
    })


profileRouter.route('/:profileId')
    .get(authenticate.verifyUser, (req, res, next) => {
        Profile.findById(req.params.profileId)
            .populate('user')
            .populate('address')
            .then((profile) => {
                if (!(profile.user.equals(req.user._id)|| req.user.user_type == 'admin')) {
                    res.statusCode = 404;
                    res.end('You are not get another profile');
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(profile);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /profile/' + req.params.profileId);
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        Profile.findById(req.params.profileId)
            .then((profile) => {
                if (profile != null) {
                    if (profile.update) {
                        if (!profile.user.equals(req.user._id)) {
                            var err = new Error('You are not authorized to update this profile!');
                            err.status = 403;
                            return next(err);
                        }
                        req.body.user = req.user._id;
                        Address.findById(profile.address)
                        .then((address) => {
                            address.houseNumber = req.body.houseNumber;
                            address.street = req.body.street;
                            address.village = req.body.village;
                            address.district = req.body.district;
                            address.provice = req.body.provice;

                            address.save();
                        });
                        profile.fullname = req.body.fullname;
                        profile.phoneNumber = req.body.phoneNumber;
                        profile.identity = req.body.identity;
                        if(req.user.user_type == 'owner'){
                            profile.active = false;
                            profile.update = true;
                        }
                        
                        else{

                            profile.active = true;
                            profile.update = true;
                        } 
                        profile.save();
                        
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({success: true, active: profile.active})
                        
                    }
                    else {
                        err = new Error('Not allow to update');
                    }
                }
                else {
                    err = new Error('profile ' + req.params.profileId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
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
    })
module.exports = profileRouter;