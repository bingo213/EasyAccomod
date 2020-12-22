const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');

const postRouter = express.Router();
postRouter.use(bodyParser.json());

const Address = require('../models/address');
const Post = require('../models/post');
const Notification = require('../models/notification');
const Comments = require('../models/comments');
const Favorite = require('../models/favorite');
const Profile = require('../models/profile');

var multer = require('multer');
const { path, add } = require('../models/address');
const profile = require('../models/profile');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
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

function getExpireDate(activeDate, typeOfTime, duration) {
  var expireDate;
  if (typeOfTime == 'week') {
    expireDate = new Date().setDate(activeDate.getDate() + duration * 7);
  } else if (typeOfTime == 'month') {
    expireDate = new Date(activeDate);
    expireDate.setMonth(expireDate.getMonth() + duration);
  } else if (typeOfTime == 'quarter') {
    expireDate = new Date(activeDate);
    expireDate.setMonth(expireDate.getMonth() + duration * 3);
  } else if (typeOfTime == 'year') {
    expireDate = new Date(activeDate);
    expireDate.setMonth(expireDate.getMonth() + duration * 12);
  }
  return expireDate;
}

//frontend gui
function getPrice(typeOfTime, duration) {
  //change function
  return 20000;
}

postRouter
  .route('/')
  .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Post.find(req.query)
      .populate('owner')
      .then(
        posts => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(posts);
        },
        err => next(error)
      )
      .catch(error => next(error));
  })

  .post(
    authenticate.verifyUser,
    upload.array('postImages', 9),
    (req, res, next) => {
      var arr = req.files;
      if (req.files.length < 3) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, message: 'images must be greater than 3' });
      }
      var paths = arr.map(item => item.path);
      var user = req.user;
      var role = user.user_type;
      req.body.owner = user._id;
      req.body.hasRent = false;
      req.body.paid = false;
      if (role === 'admin') {
        req.body.active = 1;
        req.body.activeDate = new Date();
        req.body.expireDate = getExpireDate(
          req.body.activeDate,
          req.body.typeOfTime,
          req.body.duration
        );
      } else if (role === 'owner') {
        if (user.active !== 1) {
          res.statusCode = 403;
          res.setHeader('Content-Type', 'application/json');
          res.send({ success: false, message: 'Your account not active' });
        } else {
          req.body.active = 0;
        }
      } else {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.send({ success: false, message: 'You are not owner or admin' });
      }
      Address.create(req.body)
        .then(
          address => {
            req.body.address = address._id;
            Post.create(req.body)
              .then(
                post => {
                  if (post) {
                    for (i = 0; i < paths.length; i++) {
                      post.images.push({ name: paths[i] });
                    }
                    post.save();

                    Post.findById(post._id)
                      .populate('owner')
                      .populate('address')
                      .then(post => {
                        res.statusCode = 200;
                        // res.setHeader('Constent-Type', 'application/json');
                        res.json({ success: true, post: post });
                      });
                  }
                },
                err => next(err)
              )
              .catch(err => next(err));
          },
          err => next(err)
        )
        .catch(err => next(err));
    }
  )
  .put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /posts');
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Post.remove({})
        .then(
          res => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
          },
          err => next(err)
        )
        .catch(err => next(err));
    }
  );

postRouter.route('/getAllActive').get((req, res, next) => {
  Post.find({ $and: [{ active: 1 }, { expireDate: { $gte: new Date() } }] })
    .populate('address')
    .populate('owner')
    .then(
      posts => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(posts);
      },
      err => next(error)
    )
    .catch(error => next(error));
});

postRouter
  .route('/:postId')
  .get((req, res, next) => {
    Post.findById(req.params.postId)
      .populate('address')
      .then(
        post => {
          if (req.user && req.use.user_type == 'rental') {
            post.views += 1;
            post.save();
          }
          Profile.find({ user: post.owner })
            .populate('address')
            .then(profile => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json({ post: post, author: profile });
            });
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /postes/' + req.params.postId);
  })
  .put(
    authenticate.verifyUser,
    upload.array('postImages', 9),
    (req, res, next) => {
      console.log('request body: ', req.body);

      var arr = req.files;
      if (req.files.length < 3 && req.files.length > 0) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, message: 'images must be greater than 3' });
      }
      var paths = arr.map(item => item.path);
      Post.findById(req.params.postId).then(post => {
        if (post.owner.equals(req.user._id) && post.active !== 1) {
          Post.findByIdAndUpdate(
            req.params.postId,
            { $set: req.body },
            { new: true }
          ).then(post => {
            Address.findById(post.address).then(address => {
              console.log(address);
              if (req.body.province)
                address.province = req.body.province;
              if (req.body.district)
                address.district = req.body.district;
              if (req.body.village)
                address.village = req.body.village;
              if (req.body.street)
                address.street = req.body.street;
              if (req.body.houseNumber)
                address.houseNumber = req.body.houseNumber;
              address.save();
              console.log('after save: ', address);
            });
            // Address.findByIdAndUpdate(
            //   post.address,
            //   { $set: req.body },
            //   { new: true }
            // ).then(address => {
            //   console.log(address);
            //   address.save();
            // });
            if (req.files.length !== 0) {
              for (var i = post.images.length - 1; i >= 0; i--) {
                post.images.id(post.images[i]._id).remove();
              }
              for (i = 0; i < paths.length; i++) {
                post.images.push({ name: paths[i] });
              }
              post.save();
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'appication/json');
            res.json({ post: post, success: true });
          });
        } else if (!post.owner.equals(req.user._id)) {
          res.statusCode = 403;
          res.setHeader('Content-Type', 'appication/json');
          res.json({ message: 'you are not author', success: false });
        } else if (post.active == 1) {
          res.statusCode = 403;
          res.setHeader('Content-Type', 'appication/json');
          res.json({ message: 'your post is active', success: false });
        }
      });
    }
  )
  .delete(authenticate.verifyUser, (req, res, next) => {
    Post.findById(req.params.postId).then(
      post => {
        if (req.user.user_type == 'admin') {
          if (post.active == 1 || post.active == 0) {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.json({
              success: false,
              message: 'Not permission on this post: ' + postId,
            });
          } else {
            post.remove().then(resp => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(resp);
            });
          }
        }
        if (post.owner != req.user._id) {
          res.statusCode = 403;
          res.setHeader('Content-Type', 'application/json');
          res.json({
            success: false,
            message: 'You are not  author of this post: ' + req.params.postId,
          });
        }
        post.remove().then(resp => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(resp);
        });
      },
      err => next(err)
    );
  });

postRouter
  .route('/:postId/extends')
  .post(authenticate.verifyUser, (req, res, next) => {
    Post.findById(req.params.postId).then(post => {
      if (!post.owner.equals(req.user._id)) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, message: 'You are not author of post ' });
      }
      if (post.active != 1) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, message: 'Your post not accecpted' });
      }
      if (post.expireDate < new Date()) {
        if (post.paid) {
          post.typeOfTime = req.body.typeOfTime;
          post.duration = req.body.duration;
          if (req.user.user_type == 'admin') {
            post.active = 1;
            post.activeDate = new Date();
            post.expireDate = getExpireDate(
              post.activeDate,
              post.typeOfTime,
              post.duration
            );
          }
          post.paid = false;
          post.save();

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ success: true, message: 'Gia han thanh cong' });
        } else {
          res.statusCode = 403;
          res.setHeader('Content-Type', 'application/json');
          res.json({ success: false, message: 'Not paid.' });
        }
      } else {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, message: 'Not expired' });
      }
    });
  });

postRouter
  .route('/:postId/changeStatus')
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Post.findById(req.params.postId).then(post => {
      if (post && post.active !== 1) {
        post.active = req.body.active;
        if (req.body.active == 1) {
          post.activeDate = new Date();
          post.expireDate = getExpireDate(
            post.activeDate,
            post.typeOfTime,
            post.duration
          );
        }
        post.save();
        console.log(post);

        Notification.create({
          receiver: post.owner,
          type: 'post',
          active: post.active,
          object: post._id,
        });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, message: 'Change acctive successfully' });
      } else if (!post) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          success: false,
          message: 'Not found post: ' + req.params.postId,
        });
      }
    });
  });

postRouter
  .route('/:postId/rent')
  .put(authenticate.verifyUser, (req, res, next) => {
    Post.findById(req.params.postId).then(post => {
      if (req.user._id != post.owner) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, message: 'Not author of this post' });
      }
      post.hasRent = true;
      post.save();

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, message: 'Room has been rented' });
    });
  });

postRouter.route('/:postId/comments').get((req, res, next) => {
  Comments.find({ $and: [{ post: req.params.postId }, { active: 1 }] })
    .then(comments => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, comments: comments });
    })
    .catch(err => {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: false, message: 'Not found this post' });
    });
});

postRouter.route('/:postId/favorite').get((req, res, next) => {
  Favorite.find({ post: req.params.postId })
    .then(favorites => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, favorites: favorites });
    })
    .catch(err => {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: false, message: 'Not found this post' });
    });
});

module.exports = postRouter;
