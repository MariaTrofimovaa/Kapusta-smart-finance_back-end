const express = require("express");

const { transactions: ctrl } = require("../../controllers");
const { validation, authentificate } = require("../../middlewares"); // лучше так импортировать

const router = express.Router();

// ********* 1. Все обернуть в ctrlWrapper - импорт:
// const { ctrlWrapper } = require("../../helpers");

router.get("/:type/:month", authentificate, ctrl.getAllForMonth);
router.delete("/:objId", authentificate, ctrl.del);

// ********* 2. authentificate добавить в brief и month
router.get("/brief", ctrl.getBrief);
router.get("/:month", ctrl.getCount); // данные за месяц

// ********* 3.  импортировать схему
// const {
//   transactions: { joiSchema },
// } = require("../../models/schemas");

router.post("/", authentificate, ctrl.addTransaction);

// ********* 4. - добавить валидацию joiSchema
// router.post("/", authentificate, validation(joiSchema), ctrl.addTransaction);
router.get("/day/:type/:date", authentificate, ctrl.getExpenseByDate);

module.exports = router;

// Это нам уже не надо:
// router.post("/expense", authentificate, validation(joiSchema),  ctrl.addExpense); // нужна валидация и джойсхема
// router.post("/expense", authentificate, ctrl.addExpense);
// router.post("/income", authentificate, validation(joiSchema), ctrl.addIncome); // нужна валидация и джойсхема
// router.post("/income", authentificate, ctrl.addIncome);
