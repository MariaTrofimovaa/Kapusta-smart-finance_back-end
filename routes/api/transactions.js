// Здесь должны быть роуты для получения отчета.

const express = require("express");

const { transactions: ctrl } = require("../../controllers");
const { validation, authentificate } = require("../../middlewares"); // лучше так импортировать

const router = express.Router();

router.get("/:type/:month", authentificate, ctrl.getAllForMonth);
router.delete("/:objId", authentificate, ctrl.del);
router.get("/brief", ctrl.readBrief);
router.get("/count/:month", ctrl.getCount);

// Правильно импортировать схему
// const {
//   user: { joiSchema },
// } = require("../../models/schemas");

// router.post("/expense", authentificate, validation(joiSchema),  ctrl.addExpense); // нужна валидация и джойсхема
router.post("/expense", authentificate, ctrl.addExpense);
// router.post("/income", authentificate, validation(joiSchema), ctrl.addIncome); // нужна валидация и джойсхема
router.post("/income", authentificate, ctrl.addIncome);

router.post("/", authentificate, ctrl.addTransaction);

module.exports = router;
