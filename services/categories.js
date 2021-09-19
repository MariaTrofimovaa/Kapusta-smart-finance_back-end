const { Category } = require("../models");

const listExpenseCategories = () => {
  return Category.find(
    { transactionType: "Расходы" },
    "_id date description amount category transactionType"
  );
};
const listIncomeCategories = () => {
  return Category.find(
    { transactionType: "Доходы" },
    "_id date description amount category transactionType"
  );
};

module.exports = {
  listExpenseCategories,
  listIncomeCategories,
};
