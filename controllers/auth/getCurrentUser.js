const getCurrentUser = async (req, res, next) => {
  const { email, balance } = req.user;
  res.json({
    status: "success",
    code: 200,
    email,
    balance,
  });
};

module.exports = getCurrentUser;
