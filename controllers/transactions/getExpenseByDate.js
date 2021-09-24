// Алена начала делать запрос на вызов транзакций по конкретному дню. Еще не доделала

const { transactions: service } = require("../../services");

const getExpenseByDate = async (req, res, next) => {
  const { type, date } = req.params;
  const { _id } = req.user;
  const result = await service.getExpenseByDate(_id, type, date);
  // if (result.length === 0) {
  //   res.status(404).json({
  //     status: "error",
  //     code: 404,
  //     message: `Transaction with date not found`,
  //   });
  // }
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = getExpenseByDate;
