// Здесь должны быть роуты для получения категорий расходов или доходов.

const express = require("express");
// const { routes } = require("../../app");
const { validation, authentificate } = require("../../middlewares");

const { categories: ctrl } = require("../../controllers");

const router = express.Router();

const { ctrlWrapper } = require("../../helpers");

router.get("/:type", authentificate, ctrlWrapper(ctrl.getByType));

module.exports = router;
