const express = require("express");

const { validation, authentificate } = require("../../middlewares");

const {
  user: { joiSchema },
} = require("../../models/schemas");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSchema), ctrl.signup);
router.get("/verify/:verifyToken", ctrl.verifyEmail);
router.post("/signin", validation(joiSchema), ctrl.signin);
router.get("/current", authentificate, ctrl.getCurrentUser);
router.get("/logout", authentificate, ctrl.logout);

router.post("/googlelogin", ctrl.googlelogin);

module.exports = router;
