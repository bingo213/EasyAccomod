const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const Address = require('../models/address')


var multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/test');
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

// const multer = require('multer');
// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, './uploads');
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null, Date.now() + file.originalname);
// 	}
// });

// var upload = multer({ storage: storage });

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.get(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})
.post(authenticate.verifyUser, upload.array('image',5), (req, res) => {
    Address.create({province: req.body.name});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imageUpload');
});

module.exports = uploadRouter;