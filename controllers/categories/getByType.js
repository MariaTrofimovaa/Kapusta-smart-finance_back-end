const { categories: service } = require("../../services");

const getByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    console.log(type);
    const result = await service.getByType(type);
    res.json({
      status: "sucess",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getByType;
