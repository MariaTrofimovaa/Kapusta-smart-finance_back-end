const { transactions: service } = require("../../services");

const getCount = async (req, res, next) => {
      try {
        const {month} = req.params;
        const {_id} = req.user;
        const result = await service.listCount(_id, month);
        res.json({
          status: "success",
          code: 200,
          data: {
            result,
          },
        });
      } catch (error) {
        next(error);
      }
    };
    
 module.exports = getCount;