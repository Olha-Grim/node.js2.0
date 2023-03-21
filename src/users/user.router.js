const { Router } = require('express');
const Joi = require('joi');
const { validate } = require('../helpers/validate');
const UserController = require('./user.controller');
const userRouter = Router();

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
});

userRouter.get('/', UserController.getUsers);
userRouter.post('/', validate(createUserSchema), UserController.addUsers);
userRouter.put('/:id', UserController.upDateUsers);
userRouter.delete('/:id', UserController.deleteUsers);

userRouter.patch('/:id/films', UserController.addFilmsForUsers);

module.exports = userRouter;
