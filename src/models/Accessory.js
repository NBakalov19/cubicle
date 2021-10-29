const mongoose = require('mongoose');

const accessoryScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
    validate: /^https?:\/\//
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 200
  }
});

module.exports = mongoose.model('Accessory', accessoryScheme);
