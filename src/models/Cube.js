const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
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
    max: 6,
  },
  accessories: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Accessory',
    }
  ],
  creator: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;
