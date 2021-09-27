const { users: service } = require("../../services");

const verifyEmail = async (req, res, next) => {
  const { verifyToken } = req.params;
  const user = await service.getOne({ verifyToken });
  if (!user) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "User not found by token during email verification",
    });
  }
  await service.update(user._id, { verify: true, verifyToken: null });
  res.json({
    status: "success",
    code: 200,
    message: "Verification success",
  });
};

module.exports = verifyEmail;
