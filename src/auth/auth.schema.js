const Joi = require('joi');

exports.sighUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

exports.sighInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
