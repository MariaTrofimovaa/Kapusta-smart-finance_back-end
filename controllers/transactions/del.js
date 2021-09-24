const { transactions: service, users: userService  } = require("../../services");

const del = async (req, res, next) => {
  try {
    const { id } = await req.params;
    const { _id } = req.user;


    const transaction = await service.remove(id, _id);

    if (transaction) {
      // обновим баланс на сумму удаленной транзакции
      console.log('deleted transaction', transaction);
      const oldBalance = req.user.balance;
      const newBalance =  oldBalance + transaction.amount * (transaction.transactionType === 'expense' ?  1 : -1);
      const updatedBalance = await userService.update(req.user._id, {
        balance: newBalance,
      });
      console.log('New balance', newBalance);

      // cформируем успешный ответ
      return res.status(200).json({
        status: "success",
        code: 200,
        data: {transaction:transaction, updatedBalance: updatedBalance.balance},
        message: "Object deleted",
      });
    }

    // ошибка
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = del;
