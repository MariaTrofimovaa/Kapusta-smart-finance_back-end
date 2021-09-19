const express = require("express");

const { validation, authentificate } = require("../../middlewares");

const {
  user: { joiSchema },
} = require("../../models/schemas");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSchema), ctrl.signup);
router.get("/verify/:verifyToken", ctrl.verifyEmail); //запрос на считывание токена, при переходе юзера по ссылке в письме
router.post("/signin", validation(joiSchema), ctrl.signin);
// router.get("/current", authentificate, ctrl.getCurrentUser);
router.get("/logout", authentificate, ctrl.logout);

// ***** Комментарии от Богдана:
// Не хватает роута для верификации email
// Нет валидации при логине, а она нужна.

module.exports = router;
