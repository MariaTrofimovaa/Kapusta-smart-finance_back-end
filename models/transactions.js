const { model } = require("mongoose");

const { transactions } = require("./schemas");
const { expenseSchema } = transactions;

const Transaction = model("expense", expenseSchema);

module.exports = Transaction;
