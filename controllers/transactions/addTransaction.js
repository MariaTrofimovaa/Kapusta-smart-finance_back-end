const { transactions: service, users: userService } = require("../../services");

const addTransaction = async (req, res, next) => {
  const addedTransaction = await service.addTransaction({
    ...req.body,
    userId: req.user._id,
  });
  // console.log(req.body);
  // console.log(req.user);
  // обновим баланс
  const oldBalance = req.user.balance;
  const newBalance =
    oldBalance +
    req.body.amount * (req.body.transactionType === "expense" ? -1 : 1);
  // const updatedBalance = await userService.update(req.user._id, {
  //   balance: newBalance,
  // });
  // Может стоить оставить без переменной? (Маша)
    await userService.update(req.user._id, {
        balance: newBalance,
      });

  // console.log("updatedBalance", updatedBalance);
  // console.log("New balance", newBalance);

  return res.status(201).json({
    status: "success",
    code: 201,
    data: { addedTransaction },
    // data: {addedTransaction,updatedBalance: updatedBalance.balance},
  });
};
module.exports = addTransaction;
