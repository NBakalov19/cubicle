const jwt = require('jsonwebtoken');
const { TOKEN_COOKIE_NAME, JWT_SECRET } = require('../constants');

const auth = (req, res, next) => {
  const token = req.cookies[TOKEN_COOKIE_NAME];

  if (!token) {
    return next();
  }

  jwt.verify(token, JWT_SECRET, function (err, decodedToken) {
    if (err) {
      return res.status(401).redirect('/login');
    }

    req.user = decodedToken;
    res.locals.user = decodedToken;
    next();
  });
};

const isAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).redirect('/login');
  }

  next();
};

const authMiddleware = {
  auth,
  isAuth
};

module.exports = authMiddleware;
