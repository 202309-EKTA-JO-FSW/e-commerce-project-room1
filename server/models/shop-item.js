const mongoose = require('mongoose');

const shopItem = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 128
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true    
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 500
  },
  availableCount: {
    type: Number,
    required: true
  },
  genre: {
    type: [String],
    required: true,
  }
});

module.exports = mongoose.model('ShopItem', shopItem);