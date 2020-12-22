const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
const searchRouter = express.Router();

searchRouter.use(bodyParser.json());

var Post = require('../models/post');

searchRouter.route('/getByAddress')
.get((req, res, next) => {
    var province ;
    Post.find({province:province})
    .populate({
        path: 'address',
        match: { province: 'ha noi'}
    })
    .then((posts) => {
        res.json(posts);
    })
})
searchRouter.route('/findRoom')
.post((req, res, next) =>{
    var addressDict = new Map();
    var postArray = [];
    if(req.body.province){
        addressDict.set('province' , req.body.province);
    }
    if(req.body.district){
        addressDict.set('district', req.body.district);
    }
    if(req.body.village){
        addressDict.set('village', req.body.village);
    }
    if(req.body.price){
        var arr = req.body.price.split('-');
        var begin = parseInt(arr[0]);
        var end = parseInt(arr[1]);
        postArray.push({price: {$gte : begin}})
        postArray.push({price: {$lte : end}})
    }
    if(req.body.area){
        var arr = req.body.area.split('-');
        var begin = parseInt(arr[0]);
        var end = parseInt(arr[1]);
        postArray.push({area: {$gte : begin}})
        postArray.push({area: {$lte : end}})
    }
    if (postArray.length ===0 ){
        Post.find().populate({
            path: 'address',
            match: addressDict
        }).then((posts) =>{
            res.json(posts);
        })
    }
    else{
        Post.find({$and: postArray}).populate({
            path: 'address',
            match: addressDict
        }).then((posts) =>{
            res.json(posts);
        })
    }
    
})
module.exports = searchRouter;
