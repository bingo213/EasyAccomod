const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');

const Report = require('../models/report');
const { NotExtended } = require('http-errors');

const reportRouter = express.Router();

reportRouter.use(bodyParser.json());

reportRouter.route('/')
    .get((req, res) => {
        // Report.find(req.query)
        //     .populate('author')
        //     .then((Report) => {
        //         res.statusCode = 200;
        //         res.setHeader('Content-Type', 'application/json');
        //         res.json(Report);
        //     })
        //     .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        if (req.body !== null) {
            req.body.author = req.user._id;
            Report.create(req.body)
                .then((report) => {

                    Report.findById(report._id)
                        .populate('author')
                        .populate('post')
                        .then((report) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({success: true, report: report});
                        })
                }, (err) => next(err))
                .catch((err) => next(err));
        }
        else {
            err = new Error('Report not found in request body');
            err.status = 404;
            return next(err);
        }
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        // res.statusCode = 403;
        // res.end('PUT operation not supported on /Report/');
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        // Report.remove({})
        //     .then((resp) => {
        //         res.statusCode = 200;
        //         res.setHeader('Content-Type', 'application/json');
        //         res.json(resp);
        //     }, (err) => next(err))
        //     .catch((err) => next(err));
    })

reportRouter.route('/:commentId')
    .get((req, res, next) => {
        // Report.findById(req.params.commentId)
        //     .populate('author')
        //     .then((comment) => {
        //         res.statusCode = 200;
        //         res.setHeader('Content-Type', 'application/json');
        //         res.json(comment);
        //     }, (err) => next(err))
        //     .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        // res.statusCode = 403;
        // res.end('POST operation not supported on /Report/' + req.params.commentId);
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        // Report.findById(req.params.commentId)
        //     .then((comment) => {
        //         if (comment != null) {
        //             if (!comment.author.equals(req.user._id)) {
        //                 var err = new Error('You are not authorized to delete this comment!');
        //                 err.status = 403;
        //                 return next(err);
        //             }
        //             Report.findByIdAndRemove(req.params.commentId)
        //                 .then((resp) => {
        //                     res.statusCode = 200;
        //                     res.setHeader('Content-Type', 'application/json');
        //                     res.json(resp);
        //                 }, (err) => next(err))
        //                 .catch((err) => next(err));
        //         }
        //         else {
        //             err = new Error('Comment ' + req.params.commentId + ' not found');
        //             err.status = 404;
        //             return next(err);
        //         }
        //     }, (err) => next(err))
        //     .catch((err) => next(err));
    })

// reportRouter.route('/:commentId/changeStatus')
//     .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
//         Report.findById(req.params.commentId)
//             .then((comment) => {
//                 comment.active = req.body.active;
//                 comment.save();

//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(comment);
//             })
//     })
module.exports = reportRouter;