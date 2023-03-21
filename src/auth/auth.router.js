const { Router } = require('express');
const sightUpSchema = require('./auth.schema');
const router = Router();

router.post('/signup', validate(sightUpSchema), authController.signUp);
