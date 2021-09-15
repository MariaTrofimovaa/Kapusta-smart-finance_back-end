const { Transaction } = require("../models");

const addExpense = (newExpense) => {
  return Transaction.create(newExpense);
};

module.exports = {
  addExpense,
};
