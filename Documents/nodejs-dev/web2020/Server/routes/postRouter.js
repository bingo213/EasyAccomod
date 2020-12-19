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
const { path } = require('../models/address');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
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
        expireDate.setMonth(expireDate.getMonth + duration);
    } else if (typeOfTime == 'quarter') {
        expireDate = new Date(activeDate);
        expireDate.setMonth(expireDate.getMonth + duration * 3);
    } else if (typeOfTime == 'year') {
        expireDate = new Date(activeDate);
        expireDate.setMonth(expireDate.getMonth + duration * 12);
    }
    return expireDate;
};

//frontend gui
function getPrice(typeOfTime, duration) {
    //change function
    return 20000;
};

postRouter.route('/')
    .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Post.find(req.query)
            .populate('owner')
            .then((posts) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(posts);
            }, (err) => next(error))
            .catch((error) => next(error));
    })

    .post(authenticate.verifyUser, upload.array('postImages', 10), (req, res, next) => {
        var arr = req.files;
        if (req.files.length < 3) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, message: 'images must be greater than 3' });
        }
        var paths = arr.map(item => item.path);

        var user = req.user
        var role = user.user_type;
        req.body.owner = user._id;
        req.body.hasRent = false;
        req.body.paid = false;
        console.log('req.body.images:', paths);
        if (role == 'admin') {
            req.body.active = 1;
            req.body.activeDate = new Date();
            req.body.expireDate = getExpireDate(req.body.activeDate, req.body.typeOfTime, req.body.duration)
        }
        else if (role == 'owner') {
            if (user.active != 1) {
                res.statusCode = 403;
                res.setHeader('Content-Type', 'application/json')
                res.send({ success: false, message: 'Your account not active' })
            } else {
                req.body.active = 0;
            }
        }
        else {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json')
            res.send({ success: false, message: 'You are not owner or admin' })
        }
        Address.create(req.body)
            .then((address) => {
                req.body.address = address._id;
                Post.create(req.body)
                    .then((post) => {
                        if (post) {
                            for (i = 0; i < paths.length; i++) {
                                post.images.push({ name: paths[i] });
                                console.log('post.images: ' + post.images);
                            }
                            post.save();

                            Post.findById(post._id)
                                .populate('owner')
                                .populate('address')
                                .then((post) => {
                                    res.statusCode = 200;
                                    res.setHeader('Constent-Type', 'application/json');
                                    res.json({ success: true, paths: paths, post: post })
                                })
                        }
                    }, (err) => next(err));
            }, (err) => next(err));
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /posts');
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Post.remove({})
            .then((res) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

postRouter.route('/getAllActive')
    .get((req, res, next) => {
        Post.find({ active: 1 })
            .populate('address')
            .populate('owner')
            .then((posts) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(posts);
            }, (err) => next(error))
            .catch((error) => next(error));
    })

postRouter.route('/:postId')
    .get(authenticate.verifyUser, (req, res, next) => {
        Post.findById(req.params.postId)
            .populate('owner')
            .populate('address')
            .then((post) => {
                if (req.user.user_type == 'rental') {
                    post.views += 1;
                    post.save();
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(post);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /postes/' + req.params.postId);
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        // Post.findById(req.params.postId)
        //     .then((post) => {
        //         if (req.user.user_type == 'admin' || req.user._id == post.owner) {
        //             if (post.active == 1 && req.user._id == post.owner) {
        //                 res.statusCode = 403;
        //                 res.setHeader('Content-Type', 'application/json');
        //                 res.json({ success: false, err: 'Post not allow to update' });
        //             }
        //             if (req.user.user_type == 'admin') {
        //                 post.active = 1;
        //                 post.activeDate = new Date();
        //                 post.expireDate = getExpireDate(post.activeDate);
        //             }
        //             else {
        //                 post.active = 0;
        //             }
        //             post.priceOfPost = getPrice(req.body.typeOfTime, req.body.duration);
        //             post.paid = false;

        //             var address = Address.findById(post.address);
        //             address.houseNumber = req.body.houseNumber;
        //             address.street = req.body.street;
        //             address.village = req.body.village;
        //             address.district = req.body.district;
        //             address.province = req.body.province;
        //             address.save();

        //             post.title = req.body.title;
        //             post.description = req.body.description;
        //             post.typeOfRoom = req.body.typeOfRoom;
        //             post.numberOfRoom = req.body.numberOfRoom;
        //             post.typeOfPrice = req.body.typeOfPrice;
        //             post.price = req.body.price;
        //             post.area = req.body.area;
        //             post.withOwner = req.body.withOwner;
        //             post.typeOfBadroom = req.body.typeOfBadroom;
        //             post.hasHeater = req.body.hasHeater;
        //             post.typeOfKitchen = req.body.typeOfKitchen;
        //             post.hasAirCon = req.body.hasAirCon;
        //             post.hasBalcony = req.body.hasBalcony;
        //             post.priceOfElect = req.body.priceOfElect;
        //             post.priceOfWater = req.body.priceOfWater;
        //             post.services = req.body.services;
        //             post.views = 0;
        //             post.hasRent = false;
        //             post.typeOfTime = req.body.typeOfTime;
        //             post.duration = req.body.duration;
        //             post.paid = false;

        //             post.save();
        //         }
        //     })
        Post.findById(req.params.postId)
            .then((post) => {
                if (req.user.user_type == post.owner && post.active != 1) {
                    Post.findByIdAndUpdate(req.params.postId, { ...req.body })
                        .then((post) => {
                            Address.findByIdAndUpdate(post.address, { ...req.body });
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'appication/json');
                            res.json({ post: post, success: true });
                        })
                } else if (req.user.user_type != post.owner) {
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'appication/json');
                    res.json({ message: 'you are not author', success: false });
                } else if(post.active == 1){
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'appication/json');
                    res.json({ message: 'your post is active', success: false });
                }

            })

    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Post.findById(req.params.postId)
            .then((post) => {
                if (req.user.user_type == 'admin') {
                    if (post.active == 1 || post.active == 0) {
                        res.statusCode = 403;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ success: false, message: 'Not permission on this post: ' + postId });
                    }
                    else {
                        post.remove()
                            .then((resp) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(resp);
                            })
                    }
                }
                if (post.owner != req.user._id) {
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ success: false, message: 'You are not  author of this post: ' + req.params.postId });
                }
                post.remove()
                    .then((resp) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(resp);
                    })
            }, (err) => next(err))
    });

postRouter.route('/:postId/extends')
    .post(authenticate.verifyUser, (req, res, next) => {
        Post.findById(req.params.postId)
            .then((post) => {
                if (!post.owner.equals(req.user._id)) {
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ success: false, message: 'You are not author of post ' })
                }
                if (post.active != 1) {
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ success: false, message: 'Your post not accecpted' })
                }
                if (post.expireDate < new Date()) {
                    if (post.paid) {
                        post.typeOfTime = req.body.typeOfTime;
                        post.duration = req.body.duration;
                        if (req.user.user_type == 'admin') {
                            post.active = 1;
                            post.activeDate = new Date();
                            post.expireDate = getExpireDate(post.activeDate, post.typeOfTime, post.duration);
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
            }

            )
    })


postRouter.route('/:postId/changeStatus')
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Post.findById(req.params.postId)
            .then((post) => {
                if (post.active != 1 && post) {
                    post.active = req.body.active;
                    if (req.body.active == 1) {
                        post.activeDate = new Date();
                        post.expireDate = getExpireDate(post.activeDate, post.typeOfTime, post.duration);
                    }
                    post.save();

                    Notification.create({ receiver: post.owner, type: 'post', active: post.active, object: post._id });

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ success: true, message: 'Change acctive successfully' });
                } else if(!post){
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ success: false, message: 'Not found post: ' + req.params.postId });
                }

            })
    })

postRouter.route('/:postId/rent')
    .put(authenticate.verifyUser, (req, res, next) => {
        Post.findById(req.params.postId)
            .then((post) => {
                if (req.user._id != post.owner) {
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ success: false, message: 'Not author of this post' })
                }
                post.hasRent = true;
                post.save();

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, message: 'Room has been rented' })
            })
    })

postRouter.route('/:postId/comments')
    .get((req, res, next) => {
        Comments.find({ $and: [{ post: req.params.postId }, { active: 1 }] })
            .then((comments) => {
                res.statusCode = 200;
                res.json(comments)
            })
    })

postRouter.route('/:postId/favorite')
    .get((req, res, next) => {
        Favorite.find({ post: req.params.postId })
            .then((favorites) => {
                res.statusCode = 200;
                res.json(favorites)
            })
    })


module.exports = postRouter;
