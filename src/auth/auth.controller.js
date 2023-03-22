const UserModel = require('../users/models');
const { Conflict } = require('../helpers/errors/Conflict.error');
const path = require('path');
const bcrypt = require('bcryptjs');
const { NotFound } = require('../helpers/errors/NotFound.error');
const { Forbidden } = require('../helpers/errors/Forbidden.error');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: path.join(__dirname, '../../.env') });

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    console.log(user, 'user');

    if (!user) {
      throw new NotFound('User with such email not Found');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      throw new Forbidden('Provided password is wrong');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    req.cookie('token', token, { httpOnly: true });

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

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
