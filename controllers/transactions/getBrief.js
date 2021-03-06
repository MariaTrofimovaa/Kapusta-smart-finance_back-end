const { transactions: service } = require("../../services");

const getBrief = async (req, res, next) => {
  const { _id } = req.user;
  const allIncomes = await service.readBrief(req.query, _id);
  return res.status(201).json({
    status: "success",
    code: 201,
    data: {
      allIncomes,
    },
  });
};
module.exports = getBrief;
