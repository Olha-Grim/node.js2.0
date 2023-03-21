const { Router } = require('express');
const UserModel = require('../users/models');
const { Conflict } = require('../helpers/errors/conflict.error');
const router = Router();

exports.signIn = async (req, res, next) => {};

exports.signUp = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Conflict('User with such email already exists');
    }

    const passwordHash = await bcrypt.hash(password, this._costFactor);

    const newUser = await UserModel.create({
      name,
      email,
      passwordHash,
    });

    res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

exports.authRouter = router;
