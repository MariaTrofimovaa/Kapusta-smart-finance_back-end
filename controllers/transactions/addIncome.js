const { transactions: service, users: userService } = require("../../services");

const addIncome = async (req, res, next) => {
  try {
    // добавим доходы
    const newIncome = { ...req.body, userId: req.user._id };
    const addedIncome = await service.addIncome(newIncome);

    // обновим баланс
    const oldBalance = req.user.balance;
    const newBalance = oldBalance + req.body.amount;
    const updatedBalance = await userService.update(req.user._id, {
      balance: newBalance,
    });

    const allIncomes = await service.listIncomes();
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        addedIncome,
        allIncomes,
        updatedBalance,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = addIncome;
