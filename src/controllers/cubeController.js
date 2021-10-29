const express = require('express');
const router = express.Router();
const validator = require('validator');
const cubeService = require('../services/cubeService');
const cubeAccessoryController = require('./cubeAccessoryController');
const { isAuth } = require('../middlewares/authMiddleware');
const { isOwnCube } = require('../middlewares/cubeAuthMiddleware');


const renderCreateCube = (req, res) => {
  res.render('cube/create');
};

const createCube = async (req, res) => {
  const { name, description, imageUrl, difficulty } = req.body;

  if (!validator.isURL(imageUrl)) {
   return res.render('cube/create', {error: 'Invalid Url'})
  }

  try {
    await cubeService.create(name, description, imageUrl, difficulty, req.user._id);
    res.redirect('/');
  } catch (err) {
    res.locals.error = err;
    res.render('cube/create');
  }
};

const cubeDetails = async (req, res) => {
  const cube = await cubeService.getOneDetailed(req.params['cubeId']);
  const isOwn = cube.creator === req.user._id;

  res.render('cube/details', { ...cube, isOwn });
};

const renderEditCube = async (req, res) => {
  const cube = req.cube;

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
  const cube = req.cube;

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
router.get('/:cubeId/edit', isAuth, isOwnCube, renderEditCube);
router.post('/:cubeId/edit', isAuth, isOwnCube, editCube);
router.get('/:cubeId/delete', isAuth, isOwnCube, renderDeleteCube);
router.post('/:cubeId/delete', isAuth, isOwnCube, deleteCube);
router.use('/:cubeId/accessory', cubeAccessoryController);

module.exports = router;
