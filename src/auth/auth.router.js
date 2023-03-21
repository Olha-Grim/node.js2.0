const { Router } = require('express');
const sightUpSchema = require('./auth.schema');
const AuthController = require('./auth.controller');
const { validate } = require('../helpers/validate');
const authRouter = Router();

authRouter.post('/sign-up', validate(sightUpSchema), AuthController.signUp);

module.exports = authRouter;
