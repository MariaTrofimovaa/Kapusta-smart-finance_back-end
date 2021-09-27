const { users: service } = require("../../services");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await service.getOne({ email });

  if (!user || !user.comparePassword(password)) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Wrong email or password / email is not verified",
    });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);
  await service.update(user._id, { token });
  res.json({
    status: "Success",
    code: 200,
    data: {
      token,
      email,
      balance: user.balance,
      id: user._id,
    },
  });
};

module.exports = signin;
