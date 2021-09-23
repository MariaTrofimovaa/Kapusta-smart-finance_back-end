const express = require("express");
const userCtrl = require("../../controllers").user;
const authentificate = require("../../middlewares/authentificate");

const router = express.Router();

// ********* 1. Все обернуть в ctrlWrapper - импорт:
// const { ctrlWrapper } = require("../../helpers");

router.patch("/balance", authentificate, userCtrl.setBalance);

module.exports = router;
