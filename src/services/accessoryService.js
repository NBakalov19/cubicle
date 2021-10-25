const Accessory = require('../models/Accessory');

const create = (name, imageUrl, description) => {
  let accessory = new Accessory({name, description, imageUrl});

  return accessory.save();
};

const getAll = () => {
  return Accessory.find({}).lean();
}

const getAllWithout = (accessoryIds) => {
  // return Accessory.find({_id: {$nin: accessoryIds}}).lean();//mongo DB
  return Accessory.find().where('_id').nin(accessoryIds);//mongoose
}

const accessoryService = {
  create,
  getAll,
  getAllWithout
};

module.exports = accessoryService;
