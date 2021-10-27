const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, 'Username must be at least 3 characters']
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10)
        .then(hash => {
          this.password = hash;
          next();
        });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
