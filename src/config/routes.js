const express = require('express');
const homeController = require('../controllers/homeController');
const cubeController = require('../controllers/cubeController');
const accessoryController = require('../controllers/accessoryControler');

const router = express.Router();

router.use(homeController);
router.use('/cube', cubeController);
router.use('/accessory', accessoryController);

router.use('*', (req, res) => {
  res.render('404');
});

module.exports = (app) => {
  app.use(router);
};
