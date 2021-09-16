const { users: service } = require("../../services");

const add = async (req, res, next) => {
  try {
    // console.log(req.user);
    const result = await service.add(req.body);
   
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = add;
