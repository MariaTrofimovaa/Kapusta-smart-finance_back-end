const { transactions: service } = require("../../services");

const readBrief = async (req, res, next) => {
  // console.log(req.query);
  // console.log(req.body);
  try {
    const allIncomes = await service.readBrief(req.query);
    console.log(allIncomes);
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        allIncomes,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = readBrief;
