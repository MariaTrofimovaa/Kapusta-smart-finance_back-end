// const { date } = require("joi");
const { Transaction } = require("../models");

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

const readBrief = async (query, _id) => {
  const data = await Transaction.find({
    $and: [{ transactionType: query.type }, { userId: _id }],
  });

  const findTransactions = data.filter(({ date }) => {
    if (date) {
      return date.slice(6) === query.year;
    }
  });
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

const remove = async (id, userId) => {
  const filter = { _id: id, userId: userId };
  const user = await Transaction.findById(filter);
  if (!user || user.length < 1) return false;

  const result = await Transaction.findByIdAndDelete({ _id: id });
  return result;
};

const getForMonth = async (id, type, month) => {
  const data = await Transaction.find({ userId: id, transactionType: type });

  const filtered = data.filter((obj) => {
    const monthSLice = obj.date.slice(3);
    return monthSLice === month;
  });

  return filtered;
};

const addTransaction = (newTransaction) => {
  return Transaction.create(newTransaction);
};

const getExpenseByDate = async (id, type, date) => {
  const result = await Transaction.find({
    userId: id,
    transactionType: type,
    date: date,
  });

  return result;
};

module.exports = {
  listExpenses,
  listIncomes,
  readBrief,
  listCount,
  remove,
  getForMonth,
  addTransaction,
  getExpenseByDate,
};
