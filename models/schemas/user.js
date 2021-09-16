// Здесь должно быть поле Баланс, где будет храниться баланс юзера
// по умолчанию желательно 0

const bcrypt = require("bcryptjs");
const { Schema } = require("mongoose");
const Joi = require("joi");

// const passport = "ЕН234565";
// /^[А-Я]{2}[0-9]{6}$/

const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const userSchema = Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: emailRegex,
    unique: true,
  },

  token: {
    type: String,
    default: null,
  },

  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
  token: Joi.string(),
});

module.exports = {
  userSchema,
  joiSchema,
};
