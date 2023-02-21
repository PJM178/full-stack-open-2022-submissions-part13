const { SECRET } = require('../util/config');
const jwt = require('jsonwebtoken');

const errorHandler = (error, req, res, next) => {
  console.log(error)

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json(error.errors[0].message);
  }

  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json(error.message)
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json(error.errors[0].message)
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
};

module.exports = {
  errorHandler, tokenExtractor
};