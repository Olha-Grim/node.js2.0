const { Router } = require('express');
const Joi = require('joi');
const { validate } = require('../helpers/validate');
const UserController = require('./users.controller');
const { authorize } = require('../helpers/authorize');
const userRouter = Router();

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
});

userRouter.get('/', UserController.getUsers);
userRouter.get('/current', authorize, UserController.getCurrentUser);
userRouter.post('/', validate(createUserSchema), UserController.addUsers);
userRouter.put('/:id', UserController.upDateUsers);
userRouter.delete('/:id', UserController.deleteUsers);

userRouter.patch('/:id/films', UserController.addFilmsForUsers);

module.exports = userRouter;
