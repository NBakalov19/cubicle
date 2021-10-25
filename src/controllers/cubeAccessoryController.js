const router = require('express').Router({mergeParams: true});

const cubeService = require('../services/cubeService');
const accessoriesService = require('../services/accessoryService');
const {route} = require('express/lib/router');

router.get('/attach', async (req, res) => {
  let cube = await cubeService.getOne(req.params['cubeId']);
  let accessories = await accessoriesService.getAllWithout(cube['accessories']);

  res.render('cube/accessory/attach', {cube, accessories});
});

router.post('/attach', async (req, res) => {
  const cubeId = req.params['cubeId'];
  const accessoryId = req.body['accessory'];

  await cubeService.attachAccessory(cubeId, accessoryId);

  res.redirect(`/cube/${cubeId}`);
});


module.exports = router;
