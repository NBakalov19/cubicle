const express = require('express');
const homeController = require('../controllers/homeController');
const cubeController = require('../controllers/cubeController');
const accessoryController = require('../controllers/accessoryControler');
const authController = require('../controllers/authController');
const { auth } = require('../middlewares/authMiddleware');
const { errorHandler } = require('../middlewares/errorHandlerMiddleware');

const router = express.Router();

router.use(homeController);
router.use('/cube', cubeController);
router.use('/accessory', accessoryController);
router.use(authController);

router.use('*', (req, res) => {
  res.status(404).render('404');
});

module.exports = (app) => {
  app.use(auth);
  app.use(router);
  app.use(errorHandler);
};
