const { users: service } = require("../../services");

const setBalance = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const newBalance = req.body.balance;  
    const updateResult = await service.update(userId,{balance:newBalance});   
    const {balance} = await service.getById(userId);

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
