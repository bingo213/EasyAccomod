const mongoose = require('mongoose');
const { model } = require('./leaders');
const Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dish'
        }
    ],
  
},{
    timestamps: true
})

module.exports = mongoose.model('Favorite', favoriteSchema);