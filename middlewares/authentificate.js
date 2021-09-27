const jwt = require("jsonwebtoken");
const { users: service } = require("../services");

require("dotenv").config();

const { SECRET_KEY } = process.env;

const authentificate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorize",
      });
    }
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await service.getById(id);

    if (!user || !user.token) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorize, incorrect user",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentificate;
