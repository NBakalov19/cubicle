const express = require('express');
const router = express.Router();
const cubeService = require('../services/cubeService');
const cubeAccessoryController = require('./cubeAccessoryController');

const renderCreateCube = (req, res) => {
  res.render('cube/create');
};

const createCube = async (req, res) => {
  const {name, description, imageUrl, difficulty} = req.body;

  try {
    await cubeService.create(name, description, imageUrl, difficulty);
    res.redirect('/');
  } catch (err) {
    res.status(400).send(err.message).end();
  }
};

const cubeDetails = async (req, res) => {
  const cube = await cubeService.getOneDetailed(req.params['cubeId']);

  res.render('cube/details', {...cube});
};

router.get('/create', renderCreateCube);
router.post('/create', createCube);
router.get('/:cubeId', cubeDetails);
router.use('/:cubeId/accessory', cubeAccessoryController);

module.exports = router;
