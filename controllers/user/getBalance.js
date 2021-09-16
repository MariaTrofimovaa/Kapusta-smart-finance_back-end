const { users: service } = require("../../services");

const getBalance = async (req, res, next) => {
  try {
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


module.exports = getBalance;
