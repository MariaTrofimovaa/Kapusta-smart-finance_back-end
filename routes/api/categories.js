// Здесь должны быть роуты для получения категорий расходов или доходов.

const express = require("express");
// const { routes } = require("../../app");

const { categories: ctrl } = require("../../controllers");
// const { authentificate } = require("../../middlewares");

const router = express.Router();

// ********* 1. Все обернуть в ctrlWrapper - импорт:
// const { ctrlWrapper } = require("../../helpers");

router.get("/:type", ctrl.getByType);

module.exports = router;
