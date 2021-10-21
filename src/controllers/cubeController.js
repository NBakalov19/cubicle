const express = require('express');
const router = express.Router();
const cubeService = require('../services/cubeService');

const renderCreateCube = (req, res) => {
  res.render('create');
};

const createCube = (req, res) => {
  const {name, description, imageUrl, difficulty} = req.body;

  cubeService.create(name, description, imageUrl, difficulty);

  res.redirect('/');
};

const cubeDetails = (req, res) => {
  const cube = cubeService.getOne(req.params.cubeId);

  res.render('details', {...cube});
};

router.get('/create', renderCreateCube);
router.post('/create', createCube);
router.get('/:cubeId', cubeDetails);

module.exports = router;
