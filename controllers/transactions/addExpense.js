const { transactions: service, users: userService } = require("../../services");

const addExpense = async (req, res, next) => {
  try {
    // добавим затраты
    const newExpense = { ...req.body, userId: req.user._id };
    const addedExpense = await service.addExpense(newExpense);

    // обновим баланс
    const oldBalance = req.user.balance;
    const newBalance = oldBalance - req.body.amount;
    const updatedBalance = await userService.update(req.user._id,{balance:newBalance});

    const allExpenses = await service.listExpenses();
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        addedExpense,
        allExpenses,
        updatedBalance,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = addExpense;

// =====Версия когда будет авторизация пользователя
// const addExpense = async (req, res, next) => {
//   try {
//     const newExpense = { ...req.body, owner: req.user._id };
//     const result = await service.addExpense(newExpense);
//     res.status(201).json({
//       status: "success",
//       code: 201,
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };
// module.exports = addExpense;
