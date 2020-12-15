const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');

const Address = require('../models/address');
const { NotExtended } = require('http-errors');

const addressRouter = express.Router();

addressRouter.use(bodyParser.json());

addressRouter.route('/')
    .get((req, res, next) => {
        Address.find({})
            .then((addresses) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(address);
            })
    })
    .post( (req, res, next) => {
        if (req.body != null) {
            Address.create(req.body)
                .then((address) => {
                    Address.findById(address._id)
                        .then((address) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(address);
                        })
                }, (err) => next(err))
                .catch((err) => next(err));
        }
        else {
            err = new Error('Address not found in request body');
            err.status = 404;
            return next(err);
        }
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /address/');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('delete operation not supported on /address/');
    })


addressRouter.route(':/addressId')
    .get((req, res, next) => {
        Address.findById(req.params.addressId)
            .then((address) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(address);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /address/' + req.params.addressId);
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        Address.findById(req.params.addressId)
            .then((address) => {
                if (address != null) {
                    Address.findByIdAndUpdate(req.params.addressId, {
                        $set: req.body
                    }, { new: true })
                        .then((address) => {
                            Address.findById(address._id)
                                .then((address) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(addresses);
                                })
                        }, (err) => next(err));
                }
                else {
                    err = new Error('address ' + req.params.addressId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Address.findById(req.params.addressId)
            .then((address) => {
                if (address != null) {
                    Address.findByIdAndRemove(req.params.addressId)
                        .then((resp) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(resp);
                        }, (err) => next(err))
                        .catch((err) => next(err));
                }
                else {
                    err = new Error('Comment ' + req.params.addressId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
module.exports = addressRouter;