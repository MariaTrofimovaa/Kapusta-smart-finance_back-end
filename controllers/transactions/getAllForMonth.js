const { transactions: service } = require("../../services");

const getAllForMonth = async (req, res, next) => {
  const { type, month } = req.params;
  const { _id } = req.user;
  const result = await service.getForMonth(_id, type, month);
  if (result.length === 0) {
    res.json({
      status: "error",
      code: 404,
      data: result,
      message: "Not found",
    });
  }

  res.json({
    status: "success",
//     code: 200,
    code: 204,

    data: result,
  });
};
module.exports = getAllForMonth;
