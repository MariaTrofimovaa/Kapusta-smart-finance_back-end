// const { users: service } = require("../../services");

const getCurrent = async (req, res, next) => {
  try {
    const balance = req.user.balance; // данные пользователя из базы получает предыдуший authentificate, так что еще один запрос в базу уже не нужен

    res.status(201).json({
      status: "success",
      code: 201,
      balance: balance,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
