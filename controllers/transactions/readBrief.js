const { transactions: service } = require("../../services");

const readBrief = async (req, res, next) => {
  try {
    // const { _id } = req.user;
    // console.log(_id);
    // console.log(req);
    // const allIncomes = await service.readBrief(_id, year);
    const allIncomes = await service.readBrief(req.query);

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
