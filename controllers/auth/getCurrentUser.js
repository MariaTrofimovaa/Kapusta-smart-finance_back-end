const getCurrentUser = async (req, res, next) => {
  try {
    const { email } = req.user; // забираем данные пользователя
    console.log(res);
    res.json({
      status: "success",
      code: 200,
      email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrentUser;
