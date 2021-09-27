const mongoose = require("mongoose"); // для подключения к базе
const express = require("express"); // создание роутинга
const logger = require("morgan");
const cors = require("cors"); // кросдоменные запросы
const api = require("./routes/api");

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger.json");
// const low = require("lowdb");
// const swaggerJsDoc = require("swagger-jsdoc");

// const FileSync = require("lowdb/adapters/FileSync");
// const adapter = new FileSync("swagger.json");
// const db = low(adapter);

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Library API",
//       version: "1.0.0",
//       description: "A simple Express Library API",
//     },
//     servers: [
//       {
//         url: "http://localhost:4000/api-docs",
//       },
//     ],
//   },
//   apis: ["./routes/*.js"],
// };

// const specs = swaggerJsDoc(options);
// app.db = db;

require("dotenv").config(); // чтобы содержимое файла env добавилось в переменную окружения

const app = express(); //создаем сервер

// подключаем DB_HOST
const { DB_HOST, PORT = 4000 } = process.env; // импортируем строку подключчения

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(async () => {
    console.log(`Database connection successful on server ${PORT}`);
    app.listen(PORT); // запускаем сервер
  })
  .catch((error) => console.log(error));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors()); // используем мидлвару, чтобы появились кроссдоменные запросы
app.use(express.json()); // чтобы put и patch запросы считывались

// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/api/v1/auth", api.auth);
app.use("/api/v1/transactions", api.transactions); //обработчик маршрута transactions
app.use("/api/v1/user", api.users);
app.use("/api/v1/categories", api.categories); //обработчик маршрута category

// пишем обработчик несуществующих запроосов:
app.use((_, res) => {
  res.status(404).send({
    status: "error",
    code: 404,
    message: "Not found!***",
  });
});

// пишем обработчик ошибок

app.use((error, _, res, __) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({
    status: "error",
    code: status,
    message,
  });
});
