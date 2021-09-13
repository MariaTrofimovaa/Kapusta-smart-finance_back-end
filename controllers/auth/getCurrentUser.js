const getCurrentUser = async (req, res, next) => {
  try {
    const { email, subscription } = req.user; // забираем данные пользователя
    res.json({
      status: "success",
      code: 200,
      data: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrentUser;
