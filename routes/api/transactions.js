// Здесь должны быть роуты для получения отчета.

const express = require("express");

const { transactions: ctrl } = require("../../controllers");
// const { authenticate } = require("../middlewares");

const router = express.Router();

router.post("/expense", ctrl.addExpense);
router.post("/income", ctrl.addIncome);
router.get("/brief", ctrl.readBrief);
// router.get("/brief", ctrl.readBrief);

module.exports = router;
