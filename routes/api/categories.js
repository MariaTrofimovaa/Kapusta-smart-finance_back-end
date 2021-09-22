// Здесь должны быть роуты для получения категорий расходов или доходов.

const express = require("express");
// const { routes } = require("../../app");

const { categories: ctrl } = require("../../controllers");
// const { authentificate } = require("../../middlewares");

const router = express.Router();

router.get("/:type", ctrl.getByType);

module.exports = router;
