const { transactions: service } = require("../../services");

const addExpense = async (req, res, next) => {
  try {
    const result = await service.addExpense(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
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
