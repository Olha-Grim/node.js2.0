const UserModel = require('../users/models');
const { Conflict } = require('../helpers/errors/Conflict.error');
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// exports.signIn = async (req, res, next) => {};

exports.signUp = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new Conflict('User with such email already exists');
    }

    const passwordHash = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUND),
    );

    const newUser = await UserModel.create({
      name,
      email,
      password: passwordHash,
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
