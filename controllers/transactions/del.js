const { transactions: service, users: userService } = require("../../services");

const del = async (req, res, next) => {
  const { id } = await req.params;
  const { _id } = req.user;

  const transaction = await service.remove(id, _id);
  if (transaction) {
    const oldBalance = req.user.balance;
    const newBalance =
      oldBalance +
      transaction.amount * (transaction.transactionType === "expense" ? 1 : -1);

    await userService.update(req.user._id, {
      balance: newBalance,
    });
    return res.status(200).json({
      status: "success",
      code: 200,
      data: { transaction },
      message: "Object deleted",
    });
  }

  return res.json({ status: "error", code: 404, message: "Not found" });
};

module.exports = del;
