const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');

const Comments = require('../models/comments');
const { NotExtended } = require('http-errors');

const commentRouter = express.Router();

commentRouter.use(bodyParser.json());

commentRouter
  .route('/')
  .get((req, res) => {
    Comments.find(req.query)
      .populate('author')
      .then(comments => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(comments);
      })
      .catch(err => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    if (req.body != null) {
      req.body.author = req.user._id;
      req.body.active = 0;
      Comments.create(req.body)
        .then(
          comment => {
            Comments.findById(comment._id)
              .populate('author')
              .populate('post')
              .then(comment => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
              });
          },
          err => next(err)
        )
        .catch(err => next(err));
    } else {
      err = new Error('Comment not found in request body');
      err.status = 404;
      return next(err);
    }
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /comments/');
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Comments.remove({})
        .then(
          resp => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
          },
          err => next(err)
        )
        .catch(err => next(err));
    }
  );

commentRouter
  .route('/:commentId')
  .get((req, res, next) => {
    Comments.findById(req.params.commentId)
      .populate('author')
      .then(
        comment => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(comment);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(
      'POST operation not supported on /comments/' + req.params.commentId
    );
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Comments.findById(req.params.commentId)
      .then(
        comment => {
          if (comment != null) {
            if (!comment.author.equals(req.user._id)) {
              var err = new Error(
                'You are not authorized to delete this comment!'
              );
              err.status = 403;
              return next(err);
            }
            Comments.findByIdAndRemove(req.params.commentId)
              .then(
                resp => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(resp);
                },
                err => next(err)
              )
              .catch(err => next(err));
          } else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);
          }
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

commentRouter
  .route('/:commentId/changeStatus')
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Comments.findById(req.params.commentId).then(comment => {
      comment.active = req.body.active;
      comment.save();

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true, message:'ban da cap nhat thanh cong'});
    });
  });
module.exports = commentRouter;
