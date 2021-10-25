const router = require('express').Router();
const accessoryService = require('../services/accessoryService');

const renderAccessory = (req, res) => {
  res.render('accessory/create');
};

const createAccessory = async (req, res) => {
  const {name, imageUrl, description} = req.body;

  try {
    await accessoryService.create(name, imageUrl, description);
    res.redirect('/');
  } catch (err) {
    res.status(400).send(err.message).end();
  }
};

router.get('/create', renderAccessory);
router.post('/create', createAccessory);

module.exports = router;
