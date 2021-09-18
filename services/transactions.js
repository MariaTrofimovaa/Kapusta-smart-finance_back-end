const { Transaction } = require("../models");

const addExpense = (newExpense) => {
  newExpense.transactionType = "Расходы";
  return Transaction.create(newExpense);
};

const addIncome = (newIncome) => {
  newIncome.transactionType = "Доходы";
  return Transaction.create(newIncome);
};

// const listExpenses = () => {
//   return Transaction.find(
//     { transactionType: "expense" },
//     "_id date description amount category transactionType"
//   );
// };
// const listIncomes = () => {
//   return Transaction.find(
//     { transactionType: "income" },
//     "_id date description amount category transactionType"
//   );
// };

module.exports = {
  addExpense,
  // listExpenses,
  addIncome,
  // listIncomes,
};
