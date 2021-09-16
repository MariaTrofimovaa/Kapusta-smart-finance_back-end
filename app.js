const mongoose = require("mongoose"); // для подключения к базе
const express = require("express"); // создание роутинга
const logger = require("morgan");
const cors = require("cors"); // кросдоменные запросы
const api = require("./routes/api");
const path = require("path"); //чтобы прописать пути к папкам

require("dotenv").config(); // чтобы содержимое файла env добавилось в переменную окружения

const app = express(); //создаем сервер

// подключаем DB_HOST
const { DB_HOST, PORT = 3000 } = process.env; // импортируем строку подключчения

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(async () => {
    console.log("Database connection successful");
    app.listen(PORT); // запускаем сервер
  })
  .catch((error) => console.log(error));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors()); // используем мидлвару, чтобы появились кроссдоменные запросы
app.use(express.json()); // чтобы put и patch запросы считывались

app.use("/api/v1/auth", api.auth);
// app.use("/api/v1/", api.user); //обработчик маршрута user
app.use("/api/v1/transactions", api.transactions); //обработчик маршрута transactions
app.use("/api/v1/user", api.users);

// пишем обработчик несуществующих запроосов:
app.use((_, res) => {
  console.log("error");
  res.status(404).send({
    status: "error",
    code: 404,
    message: "Not found!blablabla",
  });
});

// пишем обработчик ошибок

app.use((error, _, res, __) => {
  const { code = 500, message = "Server error" } = error;
  console.log(error);
  res.status(code).json({
    status: "error",
    code,
    message,
  });
});

module.exports = app;
