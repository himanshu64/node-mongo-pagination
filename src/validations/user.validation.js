const Joi = require('joi')

const getUsers = {
    query: Joi.object().keys({
      sortBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    }),
  };
  
module.exports = {
    getUsers
}