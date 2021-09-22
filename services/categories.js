// const { Category } = require("../models");

// const listExpenseCategories = () => {
//   return Category.find(
//     { transactionType: "expense" },
//     "_id date description amount category transactionType"
//   );
// };
// const listIncomeCategories = () => {
//   return Category.find(
//     { transactionType: "income" },
//     "_id date description amount category transactionType"
//   );
// };

// module.exports = {
//   listExpenseCategories,
//   listIncomeCategories,
// };

const { Category } = require("../models");

const getByType = (type) => {
  return Category.find({ transactionType: type });
};

module.exports = {
  getByType,
};
