const { transactions: service, users: userService } = require("../../services");

const addTransaction = async (req, res, next) => {
  const addedTransaction = await service.addTransaction({
    ...req.body,
    userId: req.user._id,
  });
  const oldBalance = req.user.balance;
  const newBalance =
    oldBalance +
    req.body.amount * (req.body.transactionType === "expense" ? -1 : 1);
  await userService.update(req.user._id, {
    balance: newBalance,
  });

  return res.status(201).json({
    status: "success",
    code: 201,
    data: { addedTransaction },
  });
};
module.exports = addTransaction;
