function errorHandler(err, req, res, next) {
  if (err.name === "UnathorizedErrro") {
    return res.status(401).json({ message: "The user is not authorized." });
  }

  if (err.name === "VaalidationError") {
    return res.status(401).json({ message: err });
  }

  return res.status(500).json(err);
}

module.exports = errorHandler;
