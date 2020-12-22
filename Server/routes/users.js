var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate');
var passport = require('passport');

const bodyParser = require('body-parser');
var User = require('../models/user');
var Profile = require('../models/profile');
const Favorite = require('../models/favorite');
const favorite = require('../models/favorite');
const Address = require('../models/address');

router.use(bodyParser.json());

// router.get('/',  function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/signup', function (req, res, next) {
  var user_type = req.body.user_type;
  var activeProfile;
  var updateProfile;
  if (!(user_type == 'owner' || user_type == 'rental')) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: false, err: 'Not support type account: ' + user_type });
  }
  User.register(
    new User({ username: req.body.username, user_type: user_type }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      } else {
        if (user_type == 'rental') {
          user.active = 1;
          updateProfile = true;
        } else {
          user.active = 0;
          updateProfile = true;
        }
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
            return;
          }
          Address.create(req.body).then(address => {
            Profile.create({
              user: user._id,
              email: req.body.email,
              fullname: req.body.fullname,
              address: address._id,
              update: updateProfile,
            });
          });

          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
              success: true,
              status: 'Registration Successful!',
              user: user,
            });
          });
        });
      }
    }
  );
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: false, status: 'Login Unsuccessful!', err: info });
    }
    req.logIn(user, err => {
      if (err) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, status: 'Counto login ' });
      }

      var token = authenticate.getToken({ _id: req.user._id });
      Profile.findOne({ user: user._id }).then(profile => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          success: true,
          role: user.user_type,
          username: user.username,
          token: token,
          userId: user._id,
          avatar: profile.avatar,
        });
      });
    });
  })(req, res, next);
});
router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, message: 'Logout Success' });
  } else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

//get profile of user
router
  .route('/:userId/profile')
  .get(authenticate.verifyUser, (req, res, next) => {
    Profile.findOne({ user: req.params.userId })
      .populate('user')
      .populate('address')
      .then(profile => {
        if (profile) {
          if (!profile.user.equals(req.params.userId)) {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.json({
              success: false,
              message: 'Not allow to get another profile! ',
            });
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ success: true, profile: profile });
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({
            success: false,
            message: 'Not found Profile',
            profile: profile,
          });
        }
      });
  });

//change Active of user
router
  .route('/:userId/changeActive')
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    User.findById(req.params.userId).then(
      user => {
        if (user) {
          if (user.user_type == 'rental') {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.json({
              success: false,
              message: 'You not have permission on Rental Account',
            });
          } else {
            user.active = req.body.active;
            user.save();
            Profile.findByIdAndUpdate(user._id, { active: user.active });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, message: 'Change active success' });
          }
        } else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.json({ success: false, message: 'Not found Account' });
        }
      },
      err => next(err)
    );
  });

//get All Favorite of one user
router.route('/favorites').get(authenticate.verifyUser, (req, res, next) => {
  Favorite.find({ user: req.user._id }, 'post')
    .populate('post')
    .then(
      favorites => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json({ success: true, posts: favorites });
      },
      err => next(err)
    )
    .catch(err => next(err));
});

router.get('/checkJWTToken', (req, res) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({ status: 'JWT invalid', success: false, err: info });
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({ status: 'JWT valid', success: true, user: user });
    }
  })(req, res);
});
module.exports = router;
