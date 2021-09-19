const { categories: service } = require("../../services");

const listIncomeCategories = async (req, res, next) => {
  try {
    const result = await service.listIncomeCategories();
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

module.exports = listIncomeCategories;
