const { Category } = require("../models");

const getByType = (type) => {
  return Category.find({ transactionType: type });
};

module.exports = {
  getByType,
};
