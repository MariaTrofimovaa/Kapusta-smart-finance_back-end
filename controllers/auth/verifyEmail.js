const { users: service } = require("../../services");

const verifyEmail = async (req, res, next) => {
  try {
    const { verifyToken } = req.params; //считываем токен
    const user = await service.getOne({ verifyToken }); //ищем юзера с таким токеном
    if (!user) {
      // если такого юзера нет - выдаем ошибку 404
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "user Not found by token during email verification",
      });
    }
    // если юзер есть - обновляем юзера и подтверждаем что он верифицирован
    await service.update(user._id, { verify: true, verifyToken: null });
    res.json({
      status: "success",
      code: 200,
      message: "Verification success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
