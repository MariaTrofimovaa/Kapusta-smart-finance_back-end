const { users: service } = require("../../services");

const setBalance = async (req, res, next) => {
  try {
    const userId = '61422103e1a984521715ca6c';
    const newBalance = req.body.balance;  
    const updateResult = await service.update(userId,{balance:newBalance});   
    const {balance} = await service.getById('61422103e1a984521715ca6c');

    res.status(201).json({
      status: "success",
      code: 201,
      balance:balance
    });
  } catch (error) {
    next(error);
  }
};


module.exports = setBalance;
