// Алена начала делать запрос на вызов транзакций по конкретному дню. Еще не доделала

const { transactions: service } = require("../../services");

const getExpenseByDate = async (req, res, next) => {
  try {
    const date = req.body.date;
    const type = req.body.type;

    const result = await service.getExpenseByDate(type, date);
    if (!result) {
      res.status(404).json({
        status: "success",
        code: 200,
        message: `Contact with date not found`,
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getExpenseByDate;
