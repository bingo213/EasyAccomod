const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const imageSchema = mongoose.Schema({
    name: String
})

const postSchema = new Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    title:{
        type: String,
        require: true,

    },
    description: {
        type: String
    },
    typeOfRoom: {
        type: String,
        enum: ['phongtro', 'chungcu','nha_nguyencan','chungcu_nguyencan']
    },
    numberOfRoom:{
        type: Number,
        min: 1
    },
    typeOfPrice: {
        type: String,
        enum: ['month','year', 'quarter']
    },
    price:{
        type: Number,
        min: 1
    },
    area:{
        type: Number,
    },
    withOwner:{
        type: Boolean
    },
    typeOfBadroom :{
        type: String,
        enum: ['public', 'private']
    },
    hasHeater:{
        type: Boolean
    },
    typeOfKitchen: {
        type: String,
        enum:['public', 'private', 'no']
    },
    hasAirCon :{
        type: Boolean
    },
    hasBalcony: {
        type: String
    },
    priceOfElect: {
        type: Number,
        min: 1
    },
    priceOfWater:{
        type: Number,
        min: 1
    },
    services:{
        type: String
    },
    views:{
        type: Number,
        default: 0,
    },
    active: {
        type: Number
    },
    activeDate: {
        type: Date,
        default: null
    },
    hasRent: {
        type: Boolean
    },
    typeOfTime: {
        type: String,
        enum: ['week','month','quarter', 'year']
    },
    duration: {
        type: Number,
        min: 1
    },
    priceOfPost:{
        type: Number,
        min: 1
    },
    paid: {
        type: Boolean,
        default: false
    },
    expireDate: {
        type: Date,
        default: null
    },
    images:[
        imageSchema
    ]
     
    }
    ,{
    timestamps: true
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;