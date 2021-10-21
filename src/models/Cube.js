const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 100,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: /^https?:\/\//,
    //   validate: {
    //     validator: function (value) {
    //       return /^https?:\/\//.test(value);
    //     },
    //     message: 'Image Url is invalid!'
    //   }
  },
  difficulty: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  }
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;
