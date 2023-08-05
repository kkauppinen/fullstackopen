const jwt = require('jsonwebtoken');
const logger = require('./logger');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization');
  if (!(authorization && authorization.startsWith('Bearer ')))
    return response.status(401).json({ error: 'invalid token' });
  let decodedToken;
  const token = authorization.replace('Bearer ', '');
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    next(error);
  }

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' });
  }

  request.token = decodedToken;
  next();
};

const userExtractor = async (request, response, next) => {
  let user;
  try {
    user = await User.findById(request.token.id);
  } catch (error) {
    next(error);
  }

  if (!user) {
    return response.status(400).json({ error: 'user not found' });
  }

  request.user = user;
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
