const Joi = require('joi');

const getUsers = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    avatar: Joi.string(),
  }),
};

module.exports = {
  getUsers,
  createUser,
};
