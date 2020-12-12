const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

var Promotions = require('../models/promotions')

promoRouter.route('/')
.get((req,res,next) => {
    Promotions.find({})
    .then((promotions) => {
      res.setStatus = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promotions);

    })
})
.post((req, res, next) => {
 Promotions.create(req.body)
 .then((promotion) => {
  console.log('Promotion Created', promotion);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(promotion);
 }, (error) => next(error))
 .catch((err) => next(err));
})
.put( (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
  Promotions.remove({})
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));  
});

promoRouter.route('/:promoId')
.get((req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then((promotion) => {
      if(promotion != null){
        res.setStatus = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
      }
      else{
        err = new Error('promotion' + res.params.promoId + 'not found');
        err.status = 404;
        return next(err);
      }
    }, (error) => next(error))
    .catch((err => next(err)));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promos/'+ req.params.promoId);
})
.put( (req, res, next) => {
  Promotions.findByIdAndUpdate(req.params.promoId, {
    $set: req.body
    }, { new: true })
  .then((promotion) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promotion);
}, (err) => next(err))
.catch((err) => next(err));
})
.delete( (req, res, next) => {
  Promotions.findByIdAndRemove(req.params.promoId)
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});


module.exports = promoRouter;
