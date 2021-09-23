const { transactions: service, users: userService } = require("../../services");

const addTransaction = async (req, res, next) => {
  try {

    const addedTransaction = await service.addTransaction({...req.body, userId:req.user._id});
    // обновим баланс
    const oldBalance = req.user.balance;
    const newBalance =  oldBalance + req.body.amount * (req.body.transactionType === 'expense' ?  -1 : 1);
    const updatedBalance = await userService.update(req.user._id, {
      balance: newBalance,
    });
    console.log('New balance', newBalance);

    return res.status(201).json({
      status: "success",
      code: 201,
      data: {addedTransaction,updatedBalance: updatedBalance.balance},
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = addTransaction;
