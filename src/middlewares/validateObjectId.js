const mongoose = require("mongoose");

const validateObjectId = (req, res, next) => {
  const invalidIds = Object.keys(req.params)
    .filter((key) => key.endsWith("_id"))
    .some((key) => {
      if (!mongoose.Types.ObjectId.isValid(req.params[key])) {
        res.status(400);
        res.send(`Invalid ${key}`);
        return true;
      }
    });

  if (invalidIds) return;
  next();
};

module.exports = {
  validateObjectId,
};
