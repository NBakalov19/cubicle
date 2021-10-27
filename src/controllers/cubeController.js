const express = require('express');
const router = express.Router();
const cubeService = require('../services/cubeService');
const cubeAccessoryController = require('./cubeAccessoryController');
const { isAuth } = require('../middlewares/authMiddleware');

const renderCreateCube = (req, res) => {
  res.render('cube/create');
};

const createCube = async (req, res) => {
  const { name, description, imageUrl, difficulty } = req.body;

  try {
    await cubeService.create(name, description, imageUrl, difficulty);
    res.redirect('/');
  } catch (err) {
    res.status(400).send(err.message).end();
  }
};

const cubeDetails = async (req, res) => {
  const cube = await cubeService.getOneDetailed(req.params['cubeId']);

  res.render('cube/details', { ...cube });
};

const renderEditCube = async (req, res) => {
  const cubeId = req.params['cubeId'];
  const cube = await cubeService.getOneDetailed(cubeId);

  res.render('cube/edit', { ...cube });
};

const editCube = async (req, res) => {
  const cubeId = req.params['cubeId'];
  const { name, description, imageUrl, difficulty } = req.body;

  try {
    await cubeService.editById(cubeId, { name, description, imageUrl, difficulty });
    res.redirect(`/cube/${cubeId}`);
  } catch (err) {
    res.status(400).send(err.message).end();
  }
};

const renderDeleteCube = async (req, res) => {
  const cubeId = req.params['cubeId'];
  const cube = await cubeService.getOneDetailed(cubeId);

  res.render('cube/delete', { ...cube });
};


const deleteCube = async (req, res) => {
  const cubeId = req.params['cubeId'];

  await cubeService.deleteById(cubeId);

  res.redirect(`/`);
};


router.get('/create', isAuth, renderCreateCube);
router.post('/create', isAuth, createCube);
router.get('/:cubeId', cubeDetails);
router.get('/:cubeId/edit', isAuth, renderEditCube);
router.post('/:cubeId/edit', isAuth, editCube);
router.get('/:cubeId/delete', isAuth, renderDeleteCube);
router.post('/:cubeId/delete', isAuth, deleteCube);
router.use('/:cubeId/accessory', cubeAccessoryController);

module.exports = router;
