const { transactions: service } = require("../../services");

const getBrief = async (req, res, next) => {
  console.log(req.query);
  try {
    // const { _id } = req.user;
    // console.log(_id);
    // console.log(req);
    // const allIncomes = await service.readBrief(_id, year);
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
module.exports = getBrief;
