const { transactions: service } = require("../../services");

const addTransaction = async (req, res, next) => {
  try {
    const addedTransaction = await service.addTransaction(req.body);
    // const allExpenses = await service.listExpenses();
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        addedTransaction,
        // allExpenses,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = addTransaction;
