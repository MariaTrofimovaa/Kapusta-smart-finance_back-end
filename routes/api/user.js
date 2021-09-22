const express = require("express");
const userCtrl = require("../../controllers").user;
const authentificate = require("../../middlewares/authentificate");

const router = express.Router();

//router.get("/", authentificate, userCtrl.getBalance);
router.get("/current", authentificate, userCtrl.getCurrent); //добавлено
//router.patch("/",authentificate, userCtrl.setBalance);
router.patch("/balance",authentificate, userCtrl.setBalance); //исправлено

module.exports = router;
