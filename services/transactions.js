const { date } = require("joi");
const { Transaction } = require("../models");

const addExpense = (newExpense) => {
  newExpense.transactionType = "expense";
  return Transaction.create(newExpense);
};

const addIncome = (newIncome) => {
  newIncome.transactionType = "income";
  return Transaction.create(newIncome);
};

const listExpenses = () => {
  return Transaction.find(
    { transactionType: "expense" },
    "_id date description amount category transactionType"
  );
};
const listIncomes = () => {
  return Transaction.find(
    { transactionType: "income" },
    "_id date description amount category transactionType"
  );
};

const readBrief = async (query) => {
  const data = await Transaction.find(
    { transactionType: query.type },
    "_id date description amount category transactionType"
  );

  const findTransactions = data.filter(
    ({ date }) => {
      if (date) {
        return date.slice(6) === query.year;
      }
    }
  );
  return findTransactions;
};

const listCount = async (owner, month) => {
  const data = await Transaction.find(
    { owner },
    "_id date description amount category transactionType"
  );
  const count = data.filter(({ date }) => date.slice(3) === month);
  return count;
};

module.exports = {
  addExpense,
  listExpenses,
  addIncome,
  listIncomes,
  readBrief,
  listCount,
};
