// дата
// описание
// категория (нужен id)
// сумма

// к какой категории относится: расход или доход
// какому юзеру принадлежит
// индекс

const { Schema } = require("mongoose");

const expenseSchema = Schema({
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
});

module.exports = { expenseSchema };
