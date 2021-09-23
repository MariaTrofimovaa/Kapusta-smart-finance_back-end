const { transactions: service } = require("../../services");

const del = async (req, res, next) => {
  try {
    const { id } = await req.params;
    const { _id } = req.user;
    const obj = await service.remove(id, _id);

    if (obj) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: obj,
        message: "Object deleted",
      });
    }

    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = del;
