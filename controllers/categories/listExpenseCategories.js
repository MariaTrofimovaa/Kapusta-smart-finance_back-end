const { categories: service } = require("../../services");

const listExpenseCategories = async (req, res, next) => {
  try {
    const result = await service.listExpenseCategories();
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

module.exports = listExpenseCategories;
