const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const imageSchema = mongoose.Schema({
  name: String,
});

const postSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    typeOfRoom: {
      type: String,
      required: true,
      enum: ['phongtro', 'chungcu', 'nha_nguyencan', 'chungcu_nguyencan'],
    },
    numberOfRoom: {
      type: Number,
      min: 1,
      required: true,
    },
    typeOfPrice: {
      type: String,
      required: true,
      enum: ['month', 'year', 'quarter'],
    },
    price: {
      type: Number,
      min: 1,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    withOwner: {
      type: Boolean,
    },
    typeOfBathroom: {
      type: String,
      enum: ['public', 'private'],
      required: true,
    },
    hasHeater: {
      type: Boolean,
      required: true,
    },
    typeOfKitchen: {
      type: String,
      enum: ['public', 'private', 'no'],
    },
    hasAirCon: {
      type: Boolean,
      required: true,
    },
    hasBalcony: {
      type: String,
      required: true,
    },
    priceOfElect: {
      type: Number,
      min: 1,
      required: true,
    },
    priceOfWater: {
      type: Number,
      min: 1,
      required: true,
    },
    services: {
      type: String
    },
    views: {
      type: Number,
      default: 0,
    },
    active: {
      type: Number,
    },
    activeDate: {
      type: Date,
      default: null,
    },
    hasRent: {
      type: Boolean,
    },
    typeOfTime: {
      type: String,
      enum: ['week', 'month', 'quarter', 'year'],
      required: true,
    },
    duration: {
      type: Number,
      min: 1,
      required: true,
    },
    priceOfPost: {
      type: Number,
      min: 1,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    expireDate: {
      type: Date,
      default: null,
    },
    images: [imageSchema],
  },
  {
    timestamps: true,
  }
);

var Post = mongoose.model('Post', postSchema);
module.exports = Post;
