const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { validation, authentificate } = require("../../middlewares");

const {
  user: { joiSchema },
} = require("../../models/schemas");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signup));
router.get("/verify/:verifyToken", ctrlWrapper(ctrl.verifyEmail));
router.post("/signin", validation(joiSchema), ctrlWrapper(ctrl.signin));
router.get("/current", authentificate, ctrlWrapper(ctrl.getCurrentUser));
router.get("/logout", authentificate, ctrlWrapper(ctrl.logout));

router.post("/googlelogin", ctrlWrapper(ctrl.googlelogin));

module.exports = router;
