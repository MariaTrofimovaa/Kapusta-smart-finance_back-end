
const service = require("../../services/users");


const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await service.getOne({ email });
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Already registered",
      });
    }

    const userData = await service.add({ ...req.body, verifyToken }); // записываем токен в базу человеку, который регистрируется

    const { URL } = process.env;

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Successfully registered. Please verify your email!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
