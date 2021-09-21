const { transactions } = require("../../models/schemas");
const { users: userService, transactions: transactionService } = require("../../services");

const setBalance = async (req, res, next) => {
  try {
    const userId = req.user._id;
    // сначала добавим транзакцию для корректировки баланса на сумму разницы между текущим балансом (чаще всего 0) и желаемым
    const oldBalance = req.user.balance;
    const newBalance = req.body.balance;
    const balanceDelta = !oldBalance ? newBalance : newBalance - oldBalance;
    const today = new Date();

    const newTransaction = {
      date: (new Date).toISOString().split('T')[0],// транзакции для корректировок баланса всегда за сегодняшнюю дату (для простоты),
      description:"Ручная корректировка баланса",
      amount:Math.abs(balanceDelta),
      category:"Прочее", 
      transactionType: (balanceDelta>=0) ? 'Доходы' : 'Расходы',  // в зависимости от знака изменения баланса (+ или -) добавим доход или расход
      userId:userId
    }     

    // добавляем транзакцию
    const transactionResult =  transactionService.addTransaction(newTransaction);    
    // обновляем баланс
    const updateResult = await userService.update(userId,{balance:newBalance});    

    // получим обновленный баланс из базы  
    const {balance} = await userService.getById(userId);

    res.status(201).json({
      status: "success",
      code: 201,
      balance: newBalance
    });
  } catch (error) {
    next(error);
  }
};


module.exports = setBalance;
