const express = require('express');
const cubeService = require('../services/cubeService');
const router = express.Router();

const renderHome = async (req, res) => {
  const cubes = await cubeService.getAll();

  res.render('index', {cubes});
};

const renderAbout = (req, res) => {

  res.render('about');
};

const renderSearch = async (req, res) => {
  const {search, from, to} = req.query;

  const cubes = await cubeService.search(search, from, to);

  res.render('index', {
    title: 'SEARCH',
    search,
    from,
    to,
    cubes,
  })
  ;
};

router.get('/', renderHome);
router.get('/about', renderAbout);
router.get('/search', renderSearch);

module.exports = router;
