const { transactions: service } = require("../../services");

const getExpenseByDate = async (req, res, next) => {
  const { type, date } = req.params;
  const { _id } = req.user;
  const result = await service.getExpenseByDate(_id, type, date);
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = getExpenseByDate;
