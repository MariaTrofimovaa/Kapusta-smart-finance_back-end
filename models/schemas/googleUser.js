const { Schema } = require("mongoose");

const googleUserSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    resetLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = { googleUserSchema };
