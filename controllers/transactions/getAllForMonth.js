const { transactions: service } = require("../../services");

const getAllForMonth = async (req, res, next) => {
  try {
    const { type, month } = req.params;
    const { _id } = req.user;
    const result = await service.getForMonth(_id, type, month);
    if(result.length === 0) {
      res.json({
        status: "success",
        code: 200,
        data: null,
      });
      }

    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getAllForMonth;
