// Здесь должны быть роуты для получения категорий расходов или доходов.

const express = require("express");
// const { routes } = require("../../app");

const { categories: ctrl } = require("../../controllers");
// const { authentificate } = require("../middlewares");

const router = express.Router();

router.get("/expense-categories", ctrl.listExpenseCategories);
// router.get("/:type/", autentificate, ctrl.getAllByType); 
router.get("/income-categories", ctrl.listIncomeCategories);

// router.get("/expense/currentYear");

module.exports = router;
