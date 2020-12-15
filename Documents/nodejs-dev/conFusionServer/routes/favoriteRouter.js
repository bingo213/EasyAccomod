const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');

const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

const Favorite = require('../models/dishes');
const Dish = require('../models/dishes');

favoriteRouter.route('/')
    .get(authenticate.verifyUser, (req, res, next) => {
        Favorite.find({ user: req.user._id })
            .populate('user')
            .populate('dishes')
            .then((favorites) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Favorite.findOne({ user: req.user._id }, (err, favorite) => {
            if (err) return next(err);

            if (!favorite) {
                Favorite.create({ user: req.user._id })
                    .then((favorite) => {
                        for (i = 0; i < req.body.length; i++)
                            if (favorite.dishes.indexOf(req.body[i]._id) < 0)
                                favorite.dishes.push(req.body[i]);
                        favorite.save()
                            .then((favorite) => {
                                Favorite.findById(favorite._id)
                                    .populate('user')
                                    .populate('dishes')
                                    .then((favorite) => {
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(favorite);
                                    })
                            })
                            .catch((err) => {
                                return next(err)
                            });
                    })
                    .catch((err) => {

                    })
            }
            else {
                for (i = 0; i < req.body.length; i++)
                    if (favorite.dishes.indexOf(req.body[i]._id))
                        favorite.dishes.push(req.body[i]);
                favorite.save()
                    .then((favorite) => {
                        Favorite.findById(favorite._id)
                            .populate('user')
                            .populate('dishes')
                            .then((favorite) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(favorite);
                            })
                    })
                    .catch((err) => {
                        return next(err)
                    });
            }
        })
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Favorite.find({ user: req.user._id })
            .then((favorite) => {
                if (favorite != null) {
                    for (var i = favorite.dishes.length - 1; i >= 0; i--) {
                        favorite.dishes.id(favorite.dishes[i]._id).remove();
                    }
                    favorite.save()
                        .then((favorite) => {
                            res.sendStatus = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite);
                        }, (err) => next(err));
                }
                else {
                    err = new Error('You not have favorite ');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites/');
    })

favoriteRouter.route('/:dishId')
    .get(authenticate.verifyUser, (req, res, next) => {
        Favorite.findOne({ user: req.user._id })
            .then((favorites) => {
                if (!favorites) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.json({ "exists": false, "favorites": favorites })
                }
                else {
                    if (favorites.dishes.indexOf(req.params.dishId) < 0) {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        return res.json({ "exists": false, "favorites": favorites })
                    }
                    else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        return res.json({ "exists": true, "favorites": favorites })
                    }
                }
            })
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Favorite.findOne({ user: req.user._id }, (err, favorite) => {
            if (err) return next(err);
            if (!favorite) {
                Favorite.create({ user: req.user._id })
                    .then((favorite) => {
                        favorite.dishes.push({ "_id": req.params.dishId })
                        favorite.save()
                            .then((favorite) => {
                                Favorite.findById(favorite._id)
                                    .populate('user')
                                    .populate('dishes')
                                    .then((favorite) => {
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(favorite);
                                    })
                            })
                            .catch((err) => {
                                return next(err)
                            });
                    })
            } else {
                if (favorite.dishes.indexOf(req.params.dishId) < 0)
                    favorite.dishes.push({ "_id": req.params.dishId })
                favorite.save()
                    .then((favorite) => {
                        Favorite.findById(favorite._id)
                            .populate('user')
                            .populate('dishes')
                            .then((favorite) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(favorite);
                            })
                    })
                    .catch((err) => {
                        return next(err)
                    });
            }
        }
        )
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Favorite.findOne({ user: req.user._id }, (err, favorite) => {
            if(err) return next(err);
            var index = favorite.dishes.indexOf(req.params.dishId)
            if(index >= 0){
                favorite.dishes.splice(index, 1);
                favorite.save()
                .then((favorite) => {
                    Favorite.findById(favorite._id)
                    .populate('user')
                    .populate('dishes')
                    .then((favorite) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);
                    })
                })
                .catch((err) => {
                    return next(err)
                })
            }
            else{
                res.statusCode = 404;
                res.end('Dish' + req.params.dishId + 'not found');
            }
        })
    })
module.exports = favoriteRouter;