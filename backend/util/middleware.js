const errorHandler = (error, req, res, next) => {
  console.log(error)

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json(error.errors[0].message);
  }

  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json(error.message)
  }

  next(error);
};

module.exports = {
  errorHandler
};