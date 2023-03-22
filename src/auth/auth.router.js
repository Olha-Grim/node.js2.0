const { Router } = require('express');
const { sighUpSchema } = require('./auth.schema');
const { sighInSchema } = require('./auth.schema');
const AuthController = require('./auth.controller');
const { validate } = require('../helpers/validate');
const authRouter = Router();

authRouter.post('/sign-up', validate(sighUpSchema), AuthController.signUp);
authRouter.post('/sign-in', validate(sighInSchema), AuthController.signIn);

module.exports = authRouter;
