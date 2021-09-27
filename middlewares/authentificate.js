const jwt = require("jsonwebtoken");
const { users: service } = require("../services");

require("dotenv").config();

const { SECRET_KEY } = process.env;

const authentificate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const [bearer, token] = authorization.split(" ");
    // console.log("token in authenticate", token);

    if (bearer !== "Bearer") {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorize",
      });
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    // console.log("id", id);
    const user = await service.getById(id);
    // console.log("user", user);
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
