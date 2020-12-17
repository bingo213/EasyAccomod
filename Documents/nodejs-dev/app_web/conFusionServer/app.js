var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var FileStore = require('session-file-store')(session);

var passport = require('passport');
var authenticate = require('./authenticate');
var passport = require('passport');
var config = require('./config');

const User = require('./models/user');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
const uploadRouter = require('./routes/uploadRouter');
var favoriteRouter = require('./routes/favoriteRouter');
var commentRouter = require('./routes/commentRouter');
var addressRouter = require('./routes/addressRouter');
var profileRouter = require('./routes/profileRouter');
var ownerRouter = require('./routes/ownerRouter');
var postRouter = require('./routes/postRouter');
var adminRouter = require('./routes/adminRouter');



const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = config.mongoUrl;
const connect = mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

connect.then((db) => {
  console.log('Connected to server');
  initial();
}, (error) => { console.log(console.error) });

function initial(){
  User.countDocuments({ user_type: 'admin' }, function (err, count) {
    if (err) {
      console.log(err)
    }
    if(count < 1){
      User.register(new User({ username: 'admin', user_type: 'admin',active: 1 }), 'adminpassword', (err, user) => {
        if (err) {
          console.log(err)
        }
        else {
            passport.authenticate('local')(req, res, () => {
            })
          };
        })
      }
    })
};

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(session({
  name: 'session-id',
  secret: 'cypher-ex',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

// app.all('*', (req, res, next)  => {
//   if (req.secure){
//     return next();
//   } else{
//     res.redirect(307, 'https://'+req.hostname+':'+app.get(
//       'secPort' )+ req.url
//     );
//   }
// }) 
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/imageUpload', uploadRouter);
app.use('/favorites', favoriteRouter);
app.use('/comments', commentRouter);
app.use('/address', addressRouter);
app.use('/profile', profileRouter);
app.use('/owner', ownerRouter);
app.use('/post', postRouter);
app.use('/admin', adminRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
