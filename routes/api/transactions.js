// Здесь должны быть роуты для получения отчета.

const express = require("express");

const { transactions: ctrl, auth } = require("../../controllers");
const authentificate = require("../../middlewares/authentificate");

const router = express.Router();


router.post("/expense", ctrl.addExpense);
router.post("/income", ctrl.addIncome);
router.get("/count/:month", ctrl.getCount);

// router.post("/expense", authentificate, ctrl.addExpense);
// router.post("/income", authentificate, ctrl.addIncome);


module.exports = router;
