const { model } = require("mongoose");

const { googleUser } = require("./schemas");
const { googleUserSchema } = require("./schemas");

const GoogleUser = model("googleUser", googleUserSchema);

module.exports = GoogleUser;
