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
    // required: [true, "Choose category"],
    // enum: ["...", "описать типы категорий"]
    // в enum запиши все категории через запятую
  },

  type: {
    type: String,
    required: true,
    enum: ["expense", "income"]
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

// добавь joiSchema и в роут добавь валидацию по joiSchema (я могла поторопиться и неверно импортироваь)
// const joiSchema = Joi.object({
//   password: Joi.string().min(6).required(),
//   email: Joi.string().required().email({
//     minDomainSegments: 2,
//   }),
// });

// module.exports = { transactionSchema , joiSchema};

module.exports = { transactionSchema };
