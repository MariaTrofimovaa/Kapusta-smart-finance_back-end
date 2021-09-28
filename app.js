const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const api = require("./routes/api");

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger.json");

require("dotenv").config();
const app = express();

const { DB_HOST, PORT = 4000 } = process.env;
mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(async () => {
    console.log(`Database connection successful on server ${PORT}`);
    app.listen(PORT);
  })
  .catch((error) => console.log(error));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/api/v1/auth", api.auth);
app.use("/api/v1/transactions", api.transactions);
app.use("/api/v1/user", api.users);
app.use("/api/v1/categories", api.categories);

app.use((_, res) => {
  res.status(404).send({
    status: "error",
    code: 404,
    message: "Not found!***",
  });
});

app.use((error, _, res, __) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({
    status: "error",
    code: status,
    message,
  });
});
