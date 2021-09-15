// Здесь должны быть роуты для получения отчета.

const express = require("express");

const { transactions: ctrl } = require("../../controllers");
// const { authenticate } = require("../middlewares");

const router = express.Router();

router.post("/", ctrl.addExpense);

module.exports = router;
