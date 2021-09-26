const moment = require("moment");

const {
  users: userService,
  transactions: transactionService,
} = require("../../services");

const setBalance = async (req, res, next) => {
  const userId = req.user._id;
  const oldBalance = req.user.balance;
  const newBalance = req.body.balance;
  const balanceDelta = !oldBalance ? newBalance : newBalance - oldBalance;

  const newTransaction = {
    date: moment(new Date()).format("DD.MM.YYYY"),
    description: "Ручная корректировка баланса",
    amount: Math.abs(balanceDelta),
    category: "Прочее",
    transactionType: balanceDelta >= 0 ? "income" : "expense",
    userId: userId,
  };

  const addedTransaction = await transactionService.addTransaction(
    newTransaction
  );
  const updateResult = await userService.update(userId, {
    balance: newBalance,
    new: true,
  });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      updatedBalance: updateResult.balance,
      addedTransaction,
    },
  });
};

module.exports = setBalance;
