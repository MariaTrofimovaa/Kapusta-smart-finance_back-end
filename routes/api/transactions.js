// Здесь должны быть роуты для получения отчета.

const express = require("express");

const { transactions: ctrl, auth } = require("../../controllers");

// const authentificate = require("../../middlewares/authentificate");
const { validation, authentificate } = require("../../middlewares"); // лучше так импортировать

const router = express.Router();

// router.post("/expense", ctrl.addExpense);
// router.post("/income", ctrl.addIncome);
router.get("/brief", ctrl.readBrief);
// router.get("/brief", ctrl.readBrief);


// router.post("/expense", ctrl.addExpense);
// router.post("/income", ctrl.addIncome);
router.get("/count/:month", ctrl.getCount);

// Правильно импортировать схему
// const {
//   user: { joiSchema },
// } = require("../../models/schemas");

// router.post("/expense", authentificate, validation(joiSchema),  ctrl.addExpense); // нужна валидация и джойсхема
router.post("/expense", authentificate, ctrl.addExpense);
// router.post("/income", authentificate, validation(joiSchema), ctrl.addIncome); // нужна валидация и джойсхема
router.post("/income", authentificate, ctrl.addIncome);

module.exports = router;
