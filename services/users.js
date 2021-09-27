const { User } = require("../models");

const getOne = (filter) => {
  return User.findOne(filter);
};

const getById = (id) => User.findById(id);

const add = ({ password, ...rest }) => {
  const newUser = new User(rest);
  newUser.setPassword(password);
  return newUser.save();
};

const update = async (id, updateUser) => {
  const result = await User.findByIdAndUpdate(id, updateUser, { new: true });
  return result;
};

module.exports = {
  getOne,
  add,
  getById,
  update,
};
