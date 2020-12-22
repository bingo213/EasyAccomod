var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');

var session = require('express-session');
var FileStore = require('session-file-store')(session);

var swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const router = require('express').Router();

var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:3001',
  basePath: '/',
};

var options = {
  swaggerDefinition: swaggerDefinition,

  apis: ['./routes/*.js'],
};
var swaggerSpec = swaggerJSDoc(options);

var passport = require('passport');
var authenticate = require('./authenticate');
var passport = require('passport');
var config = require('./config');

const User = require('./models/user');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var favoriteRouter = require('./routes/favoriteRouter');
var commentRouter = require('./routes/commentRouter');
var addressRouter = require('./routes/addressRouter');
var profileRouter = require('./routes/profileRouter');
var ownerRouter = require('./routes/ownerRouter');
var postRouter = require('./routes/postRouter');
var adminRouter = require('./routes/adminRouter');
var searchRouter = require('./routes/searchRouter');
var uploadRouter = require('./routes/uploadRouter');

const mongoose = require('mongoose');

const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

connect.then(
  db => {
    console.log('Connected to server');
    initial();
  },
  error => {
    console.log(console.error);
  }
);

function initial() {
  User.countDocuments({ user_type: 'admin' }, function (err, count) {
    if (err) {
      console.log(err);
    }
    if (count < 1) {
      User.register(
        new User({ username: 'admin', user_type: 'admin', active: 1 }),
        'adminpassword',
        (err, user) => {
          if (err) {
            console.log(err);
          } else {
            passport.authenticate('local')(req, res, () => {});
          }
        }
      );
    }
  });
}

var app = express();
app.use(cors());
// app.use(fileUpload());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get('/swagger.json', function(req, res) {
//   res.setHeader('Content-Type', 'application/json');
//   res.send(swaggerSpec);
// });
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  session({
    name: 'session-id',
    secret: 'cypher-ex',
    saveUninitialized: false,
    resave: false,
    store: new FileStore(),
  })
);

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/uploads', express.static('uploads'));
app.use(express.static(__dirname));

app.use('/favorites', favoriteRouter);
app.use('/comments', commentRouter);
app.use('/address', addressRouter);
app.use('/profile', profileRouter);
app.use('/owner', ownerRouter);
app.use('/post', postRouter);
app.use('/admin', adminRouter);
app.use('/search', searchRouter);
app.use('/upload', uploadRouter);

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
