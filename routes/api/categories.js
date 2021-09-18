// Здесь должны быть роуты для получения категорий расходов или доходов.

const express = require("express");
// const { routes } = require("../../app");

const { categories: ctrl } = require("../../controllers");
// const { authenticate } = require("../middlewares");

const router = express.Router();

router.get("/expense-categories", ctrl.listExpenseCategories);
router.get("/income-categories", ctrl.listIncomeCategories);

// router.get("/expense/currentYear");

module.exports = router;
