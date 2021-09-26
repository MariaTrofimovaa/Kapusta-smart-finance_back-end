const { Schema } = require("mongoose");
const Joi = require("joi");

const transactionSchema = Schema({
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: [true, "Describe expense"],
  },

  amount: {
    type: Number,
    required: [true, "Insert the amount"],
    min: 0,
  },
  category: {
    type: String,
    required: [true, "Choose category"],
    enum: [
      "Транспорт",
      "Продукты",
      "Здоровье",
      "Алкоголь",
      "Развлечения",
      "Всё для дома",
      "Техника",
      "Коммуналка и связь",
      "Спорт и хобби",
      "Образование",
      "Прочее",
      "ЗП",
      "Дополнительные доходы",
    ],
  },
  transactionType: {
    type: String,
    required: true,
    enum: ["expense", "income"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const joiSchema = Joi.object({
  date: Joi.string().required(),
  date: Joi.string(),
  description: Joi.string().required(),
  amount: Joi.number().min(1).required(),
  category: Joi.string().required(),
  transactionType: Joi.string().required(),
  // userId: Joi.string().required(),
});

module.exports = { transactionSchema, joiSchema };
