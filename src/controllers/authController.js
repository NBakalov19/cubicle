const router = require('express').Router();
const authService = require('../services/authService');
const { TOKEN_COOKIE_NAME } = require('../constants');

const renderRegister = (req, res) => {
  res.render('auth/register');
};

const register = async (req, res) => {
  const { username, password, repeatPassword } = req.body;

  try {
    await authService.register(username, password, repeatPassword);
  } catch (err) {
    res.statusCode(400).render('404');
  }

  res.redirect('/login');
};

const renderLogin = async (req, res) => {
  res.render('auth/login');
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await authService.login(username, password);

    if (user) {
      const token = await authService.createToken(user);

      res.cookie(TOKEN_COOKIE_NAME, token, { httpOnly: true });
      res.redirect('/');
    } else {
      res.status(400).render('404');

    }
  } catch (error) {
    res.status(400).render('404');
  }

};

router.get('/register', renderRegister);
router.post('/register', register);
router.get('/login', renderLogin);
router.post('/login', login);

module.exports = router;
