// дата
// описание
// категория (нужен id)
// сумма

// к какой категории относится: расход или доход
// какому юзеру принадлежит
// индекс

const { Schema } = require("mongoose");

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

// ********* 1. Импортировать joiSchema
// const Joi = require("joi");

// ********* 2. Добавить регулярное выражение
// const dateRegExp = /^[0-3]{1}[0-1]{1}.[0-1]{1}[0-9]{1}.[1-2]{1}[0-9]{3}$/

// ********* 3. В схему добавить:
// date: {
//   type: String,
//   match: dateRegExp, <------ эту строку
//   required: true,
// },

// ********* 4. Собственно сама схема. Наверное у нас опять все полетит (Маша)

// const joiSchema = Joi.object({
//   // date: Joi.string().pattern(dateRegExp).required(),
//   date: Joi.string().required(),
//   description: Joi.string().required(),
//   amount: Joi.number().min(1).required(),
//   category: Joi.string().required(),
//   transactionType: Joi.string().required(),
//   userId: Joi.string().required(),
// });

// module.exports = { transactionSchema, joiSchema };

module.exports = { transactionSchema };
