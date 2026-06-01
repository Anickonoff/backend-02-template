const logMethodMiddleware = (req, res, next) => {
  console.log("Request Type:", req.method, " Request URL:", req.url);
  next();
};

module.exports = {
  logMethodMiddleware,
};
