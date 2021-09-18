const { transactions } = require("../../models/schemas");
const { users: userService, transactions: transactionService } = require("../../services");

const setBalance = async (req, res, next) => {
  try {
    const userId = req.user._id;
    // сначала добавим транзакцию для корректировки баланса на сумму разницы между текущим балансом (чаще всего 0) и желаемым
    const oldBalance = req.user.balance;
    const newBalance = req.body.balance;
    const balanceDelta = !oldBalance ? newBalance : newBalance - oldBalance;
    const today = new  Intl.DateTimeFormat('en-GB').format(new Date()); // транзакции для корректировок баланса всегда за сегодняшнюю дату (для простоты)

    const newTransaction = {date:today,description:"ручная корректировка баланса",amount:Math.abs(balanceDelta),category:"other"}  
    // в зависимости от знака изменения баланса (+ или -) добавим доход или расход
    const transactionResult = balanceDelta>=0 ? transactionService.addIncome(newTransaction) : transactionService.addExpense(newTransaction);
    
    // обновляем баланс
    const updateResult = await userService.update(userId,{balance:newBalance});    

    // получим обновленный баланс из базы  
    const {balance} = await userService.getById(userId);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        transactionResult,
        updateResult,
        balance: newBalance,
      }
    });
  } catch (error) {
    next(error);
  }
};


module.exports = setBalance;
