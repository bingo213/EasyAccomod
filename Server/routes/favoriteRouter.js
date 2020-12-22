const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');

const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

const Favorite = require('../models/favorite');
const Post = require('../models/post');

favoriteRouter
  .router('/checkFavorite')
  .post(authenticate.verifyUser, (req, res, next) => {
    Post.findById(req.body.post).then(post => {
      if (post) {
        Favorite.find({
          $and: [{ user: req.user._id }, { post: req.body.post }],
        }).then(favorite => {
          if (favorite) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ like: true, message: 'Ban da thich bai viet nay' });
          } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ like: false, message: 'Ban chua thich bai viet nay' });
          }
        });
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, message: 'Khong thay bai viet nay' });
      }
    });
  });
favoriteRouter
  .route('/')
  .get(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /favorites/');
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Post.findById(req.body.post)
      .then(
        post => {
          if (post) {
            Favorite.find({
              $and: [{ user: req.user._id }, { post: req.body.post }],
            }).then(favorites => {
              if (favorite.length == 0) {
                Favorite.create({ user: req.user._id, post: req.body.post })
                  .then(favorite => {
                    Favorite.findById(favorite._id)
                      .populate('user')
                      .populate('post')
                      .then(favorite => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ success: true, favorite: favorite });
                      });
                  })
                  .catch(err => {
                    return next(err);
                  });
              } else {
                Favorite.findOneAndDelete({
                  $and: [{ user: req.user._id }, { post: req.body.post }],
                });
                then(resp => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json({
                    success: true,
                    message: 'Ban da bo thich bai viet nay',
                  });
                });
              }
            });
          } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, message: 'Khong thay bai viet nay' });
          }
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Favorite.find({ user: req.user._id })
      .then(
        favorites => {
          if (favorites != null) {
            for (var i = favorites.length - 1; i >= 0; i--) {
              favorites[i].remove();
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send({ success: true, message: 'Xoa thanh cong' });
          } else {
            err = new Error('You not have favorite ');
            err.status = 404;
            return next(err);
          }
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites/');
  });

favoriteRouter
  .route('/:favoriteId')
  .get(authenticate.verifyUser, (req, res, next) => {
    Favorite.findById(req.params.favoriteId)
      .populate('post')
      .then(favorite => {
        if (!favorites) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          return res.json({ success: false, message: 'not found ' });
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          return res.json({ success: true, favorite: favorite });
        }
      })
      .catch(err => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(
      'POST operation not supported on /favorites/' + req.params.favoriteId
    );
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(
      'PUT operation not supported on /favorites/' + req.params.favoriteId
    );
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Favorite.findOneAndDelete({ user: req.user._id, post: req.body.post })
      .then(resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      })
      .catch(err => {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, message: 'Not found this post' });
      });
  });
module.exports = favoriteRouter;
