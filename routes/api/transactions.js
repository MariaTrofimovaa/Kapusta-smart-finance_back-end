const express = require("express");

const { transactions: ctrl } = require("../../controllers");
const { validation, authentificate } = require("../../middlewares"); 
const { ctrlWrapper } = require("../../helpers");
const {
  transactions: { joiSchema },
} = require("../../models/schemas");

const router = express.Router();


router.get("/:type/:month", authentificate, ctrlWrapper(ctrl.getAllForMonth));
router.delete("/:id", authentificate, ctrlWrapper(ctrl.del));
router.get("/brief", authentificate, ctrlWrapper(ctrl.getBrief));
router.post(
  "/",
  authentificate,
  validation(joiSchema),
  ctrlWrapper(ctrl.addTransaction)
);
router.get(
  "/day/:type/:date",
  authentificate,
  ctrlWrapper(ctrl.getExpenseByDate)
);

// ********* Он нам не нужен ()
// router.get("/:month", ctrlWrapper(ctrl.getCount)); // данные за месяц

module.exports = router;
