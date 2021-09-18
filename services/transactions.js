const { Transaction } = require("../models");

// const addExpense = (newExpense) => {
//   newExpense.transactionType = "Расходы";
//   return Transaction.create(newExpense);
// };

// const addIncome = (newIncome) => {
//   newIncome.transactionType = "Доходы";
//   return Transaction.create(newIncome);
// };

const addTransaction = (newTransaction) => {
  return Transaction.create(newTransaction);
};

module.exports = {
  // addExpense,
  // addIncome,
  addTransaction,
};
