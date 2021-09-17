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
  },
  description: {
    type: String,
    required: [true, "Describe expense"],
  },

  amount: {
    type: Number,
    required: [true, "Insert the amount"],
  },
  category: {
    type: String,
    required: [true, "Choose category"],
  },

  transactionType: {
    type: String,
  },
  userId: {
    type: String,
  },
});

module.exports = { transactionSchema };
