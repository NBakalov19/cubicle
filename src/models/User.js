const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: [/^[a-zA-Z0-9]+$/, 'Username should consist only english letters and digits'],
    minlength: [5, 'Username must be at least 5 characters']
  },
  password: {
    type: String,
    required: true,
    validate: [/^[a-zA-Z0-9]+$/, 'Password should consist only english letters and digits'],
    minlength: [8, 'Password must be at least 8 characters']
  }
});

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10)
        .then(hash => {
          this.password = hash;
          next();
        });
});

userSchema.method('validatePassword', function (password) {
  return bcrypt.compare(password, this.password);
});

userSchema.virtual('repeatPassword')
          .set(function (value) {
            if (value !== this.password) {
              throw Error('Password mismatch');
            }
          });

const User = mongoose.model('User', userSchema);

module.exports = User;
