const { transactions: service } = require("../../services");

const addTransaction = async (req, res, next) => {
  try {

    const addedTransaction = await service.addTransaction({...req.body, userId:req.user._id});

    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        addedTransaction,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = addTransaction;
