const express = require("express");

const { ctrlWrapper } = require("../../helpers");

const { users: ctrl } = require("../../controllers");

const { joiSchema } = require("../../models/schemas/user");

const { validation, authentificate } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.getOne);

// router.get("/:id", ctrlWrapper(ctrl.getById));

// router.post("/", authentificate, validation(joiSchema), ctrl.add);

// router.put("/:id", ctrlWrapper, ctrl.update);

// router.delete("/:id", authentificate, ctrlWrapper(ctrl.del));

module.exports = router;
