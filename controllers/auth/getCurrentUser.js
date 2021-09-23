const getCurrentUser = async (req, res, next) => {
  try {
    const { email, balance } = req.user; // забираем данные пользователя
    console.log(res);
    res.json({
      status: "success",
      code: 200,
      email,
      balance,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getCurrentUser;
