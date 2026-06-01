const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    res.status(400).send(`Validation error: ${err.message}`);
  } else if (err.name === "CastError") {
    res.status(400).send(`Invalid data format: ${err.message}`);
  } else {
    res.status(500);
    res.send(`Internal server error: ${err.message}`);
  }
};

module.exports = {
  errorHandler,
};
