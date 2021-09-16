const { users: service } = require("../../services");
const jwt = require("jsonwebtoken");

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body; // извлекаем eмейл и пароль из тела запроса

    const user = await service.getOne({ email }); // проверяем, есть ли такой пользователь

    // если пользователь не найден или не найден пароль или не подтвердил email:
    if (!user || !user.comparePassword(password)) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Wrong email or password / email is not verified",
      });
    }

    // 1. создаем payload
    const payload = {
      id: user._id,
    };
    // 2. берем секретный ключ для генерации токена из переменной окружения
    const { SECRET_KEY } = process.env; // каждый раз не нужно вызывать dotenv, он уже есть в app

    // 3. если пароль верный, гененрируем токен и отправляем
    const token = jwt.sign(payload, SECRET_KEY);
    await service.update(user._id, { token, email}); // сохраняем токен в базе данных
    res.json({
      status: "success",
      code: 200,
      data: {
        token,
        email,
        id: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signin;
