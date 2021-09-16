const { model } = require("mongoose");

const { transactions } = require("./schemas");
const { transactionSchema } = transactions;

const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
