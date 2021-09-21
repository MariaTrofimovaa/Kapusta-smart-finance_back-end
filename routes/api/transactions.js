// Здесь должны быть роуты для получения отчета.

const express = require("express");

const { transactions: ctrl } = require("../../controllers");
const { validation, authentificate } = require("../../middlewares"); // лучше так импортировать

const router = express.Router();

router.get("/:type/:month", authentificate, ctrl.getAllForMonth);
router.delete("/:objId", authentificate, ctrl.del);
// authentificate добавить в brief и month
router.get("/brief", ctrl.readBrief);
router.get("/:month", ctrl.getCount); // данные за месяц

// Правильно импортировать схему
// const {
//   user: { joiSchema },
// } = require("../../models/schemas");

// router.post("/expense", authentificate, validation(joiSchema),  ctrl.addExpense); // нужна валидация и джойсхема
// router.post("/expense", authentificate, ctrl.addExpense);
// router.post("/income", authentificate, validation(joiSchema), ctrl.addIncome); // нужна валидация и джойсхема
// router.post("/income", authentificate, ctrl.addIncome);

router.post("/", authentificate, ctrl.addTransaction);

// Алена начала делать запрос на вызов транзакций по конкретному дню. Еще не доделала

// router.get("/:type/:day", authentificate, ctrl.getByDay);

module.exports = router;
