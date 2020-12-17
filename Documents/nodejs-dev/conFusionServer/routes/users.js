var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate');
var passport = require('passport');

const bodyParser = require('body-parser');
var User = require('../models/user');

router.use(bodyParser.json());

// router.get('/',  function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/signup', function (req, res, next) {
  var user_type = req.body.user_type;
  if (!(user_type == 'owner' || user_type == 'rental')) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: false, status: 'Not support type account: ' + user_type });
  }
  User.register(new User({ username: req.body.username, user_type: user_type }), req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
    }
    else {
      if(user_type == 'rental')
       user.active = 1;
      else user.active = 0;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({ err: err });
          return;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ success: true, status: 'Registration Successful!', user: user });
        })
      });
    }
  })
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: false, status: 'Login Unsuccessful!', err: info });
    }
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, status: 'Counto login ' });
      }

      var token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, role: user.user_type, token: token });
    });
  })(req, res, next);
})
router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
})

router.route('/')
  .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    User.find({})
      .then((users) => {
        res.setStatus = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      })
  })
router.get('/checkJWTToken', (req, res) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({ status: 'JWT invalid', success: false, err: info });
    }
    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({ status: 'JWT valid', success: true, user: user });
    }
  })(req, res);
})
module.exports = router;
