const Cube = require('../models/Cube');

const getAll = () => Cube.find({}).lean();

const getOne = (cubeId) => Cube.findById(cubeId).lean();
const getOneDetailed = (cubeId) => Cube.findById(cubeId).populate('accessories').lean();

const create = (name, description, imageUrl, difficulty) => {
  let cube = new Cube({ name, description, imageUrl, difficulty });

  return cube.save();
};

const search = async (name, from, to) => {
  let result = await getAll();

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

const attachAccessory = async (cubeId, accessoryId) => {
  let cube = await Cube.findById(cubeId);

  cube.accessories.push(accessoryId);

  return cube.save();
};

const editById = (cubeId, cube) => Cube.findByIdAndUpdate(cubeId, cube);

const deleteById = (cubeId) => Cube.findByIdAndDelete(cubeId);

const cubeService = {
  getAll,
  getOne,
  getOneDetailed,
  create,
  search,
  attachAccessory,
  editById,
  deleteById,
};

module.exports = cubeService;
