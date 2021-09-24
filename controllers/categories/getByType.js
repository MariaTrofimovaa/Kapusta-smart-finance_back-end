const { categories: service } = require("../../services");

const getByType = async (req, res, next) => {
  const { type } = req.params;
  const result = await service.getByType(type);
  res.json({
    status: "sucess",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getByType;
