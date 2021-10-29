const cubeService = require('../services/cubeService');

const isOwnCube = (req, res, next) => {
  let cube = cubeService.getOne(req.params['cubeId']);

  if (cube['creator'] === req.user._id) {
    req.cube = cube;

    next();
  } else {
    next('you are not authorized to edit this cube');
  }
};

const cubeAuthMiddleware = {
  isOwnCube,
};

module.exports = cubeAuthMiddleware;
