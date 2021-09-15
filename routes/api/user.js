const express = require("express");
const userCtrl = require("../../controllers").user;


const router = express.Router();

router.get("/",userCtrl.getBalance);
router.patch("/",userCtrl.setBalance);

module.exports = router;