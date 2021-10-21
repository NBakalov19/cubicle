const Cube = require('../models/Cube');

const cubeDb = [];

const getAll = () => Cube.cubes;

const create = (name, description, imageUrl, difficulty) => {
  let cube = new Cube(name, description, imageUrl, difficulty);

  Cube.add(cube);
};

const getOne = (cubeId) => Cube.cubes.find(cube => cube.id = cubeId);

const search = (name, from, to) => {
  let result = Cube.cubes;

  if (name) {
    result = result.filter(x => x.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (from) {
    result = result.filter(x => x.difficulty >= Number(from));
  }

  if (to) {
    result = result.filter(x => x.difficulty <= Number(to));
  }

  return result;
};
const cubeService = {
  create,
  getAll,
  getOne,
  search,
};

module.exports = cubeService;
