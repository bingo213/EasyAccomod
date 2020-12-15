var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');



passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user){
    return jwt.sign(user, config.secretKey, { expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log('jwt_payload: ',jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user)=>{
            if(err){
                return done(err, false);
            }
            else if (user){
                return done(null, user);
            }else{
                return done(null, false);
            }
        })
    }));
exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.verifyAdmin = (req, res, next) => {
    if(req.user.user_type == 'admin'){
        next();
    }else{
        err = new Error('You are not admin');
        err.status = 403;
        return next(err);
    }
}

exports.verifyRental = (req, res, next) => {
    if(req.user.user_type == 'rental'){
        next();
    }else{
        err = new Error('You are not rental');
        err.status = 403;
        return next(err);
    }
}
exports.verifyOwner = (req, res, next) => {
    if(req.user.user_type == 'owner'){
        next();
    }else{
        err = new Error('You are not owner');
        err.status = 403;
        return next(err);
    }
}