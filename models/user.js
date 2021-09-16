const { model } = require("mongoose");

const { user } = require("./schemas");
const { userSchema } = require("./schemas");

const User = model("user", userSchema);

module.exports = User;
