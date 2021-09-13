const signup = require("./signup");
const signin = require("./signin");
const getCurrentUser = require("./getCurrentUser");
const logout = require("./logout");
const uploadAvatar = require("./uploadAvatar");
const verifyEmail = require("./verifyEmail")

module.exports = {
  signup,
  signin,
  getCurrentUser,
  logout,
  uploadAvatar,
  verifyEmail,
};
