// Алена начала делать запрос на вызов транзакций по конкретному дню. Еще не доделала

const { transactions: service } = require("../../services");

const getAllByDate = async (req, res, next) => {
  try {
    const date = req.body.date;
    const type = req.body.type;
    console.log(req.body);
    // const { _id } = req.user;
    const result = await service.getAllByDate(date, type);
    if (!result) {
      res.status(404).json({
        status: "success",
        code: 200,
        message: `Contact with date = ${date} not found`,
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

module.exports = getAllByDate;
