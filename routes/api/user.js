const express = require("express");
const userCtrl = require("../../controllers").user;
const authentificate = require("../../middlewares/authentificate");

const router = express.Router();

router.get("/", authentificate, userCtrl.getBalance);
router.patch("/",authentificate, userCtrl.setBalance);

module.exports = router;
