// const { transactions } = require("../../models/schemas");
const moment = require('moment');

const {
  users: userService,
  transactions: transactionService,
} = require("../../services");

const setBalance = async (req, res, next) => {
  try {
    const userId = req.user._id;
    // сначала добавим транзакцию для корректировки баланса на сумму разницы между текущим балансом (чаще всего 0) и желаемым
    const oldBalance = req.user.balance;
    const newBalance = req.body.balance;
    const balanceDelta = !oldBalance ? newBalance : newBalance - oldBalance;

    const newTransaction = {
      date: moment(new Date).format('DD.MM.YYYY'), // транзакции для корректировок баланса всегда за сегодняшнюю дату (для простоты),
      description: "Ручная корректировка баланса",
      amount: Math.abs(balanceDelta),
      category: "Прочее",
      transactionType: balanceDelta >= 0 ? "income" : "expense", // в зависимости от знака изменения баланса (+ или -) добавим доход или расход
      userId: userId,
    };

    // добавляем транзакцию
    const addedTransaction = await transactionService.addTransaction(newTransaction);
    // обновляем баланс
    const updateResult = await userService.update(userId, {
      balance: newBalance, new:true
    });


    res.status(201).json({
      status: "success",
      code: 201,
      data: {updatedBalance: updateResult.balance,
            addedTransaction: addedTransaction},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = setBalance;
