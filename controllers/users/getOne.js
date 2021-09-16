const { users: service } = require("../../services");

const getOne = async (req, res, next) => {
  try {
    const result = await service.getOne();
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getOne;
