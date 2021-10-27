const User = require('../models/User');
const bcrypt = require('bcrypt');
const { jwtSign } = require('../utils/jwtUtils');
const { JWT_SECRET } = require('../constants');

const register = (username, password, repeatPassword) => {
  return User.create({ username, password });
};

// exports.register = function (username, password, repeatPassword) {
//  return bcrypt.hash(password, 10)
//                .then(hash => User.create({ username, password: hash }));
// }

const login = async (username, password) => {
  const user = await User.findOne({ username });
  const isValid = await bcrypt.compare(password, user.password);

  return isValid ? user : null;

  // return User.findByUsername(username)
  //            .then(user => {
  //              return Promise.all([bcrypt.compare(password, user.password)], user);
  //            })
  //            .then(([isValid, user]) => {
  //              if (isValid) {
  //                return user;
  //              }
  //              throw { message: 'Cannot find username or password' };
  //            });
};

const createToken = (user) => {
  let payload = {
    _id: user._id,
    username: user.username,
  };

  return jwtSign(payload, JWT_SECRET);
};


const authService = {
  register,
  login,
  createToken
};

module.exports = authService;
