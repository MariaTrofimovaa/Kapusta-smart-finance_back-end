const express = require("express");
const { authentificate } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { categories: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/:type", authentificate, ctrlWrapper(ctrl.getByType));

module.exports = router;
