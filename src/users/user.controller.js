const Joi = require('joi');
const UserModel = require('./models');
const {
  Types: { ObjectId },
} = require('mongoose');

exports.getUsers = async (req, res, next) => {
  const userList = await UserModel.find();

  res.status(200).json({
    status: 'success',
    data: { userList },
  });
};
exports.validateFilmsUser = async (req, res, next) => {
  const validationRules = Joi.object({
    name: Joi.string().required(),
  });

  const validationResult = Joi.validate(req.body, validationRules);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error);
  }
  next();
};

exports.addFilmsForUsers = async (req, res, next) => {
  const userId = req.params.id;

  try {
    if (!ObjectId.isValid(userId)) {
      return res.status(404).send({ message: 'Invalid id' });
    }

    const upDateUser = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { films: req.body } },
      { new: true },
    );

    res.status(200).json({
      status: 'success',
      data: { upDateUser },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      data: "Don't find user",
    });
  }
};

exports.addUsers = async (req, res, next) => {
  const userList = await UserModel.create(req.body);

  res.status(200).json({
    status: 'success',
    data: { userList },
  });
};

exports.upDateUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
      return res.status(404).send({ message: 'Invalid id' });
    }
    const user = await UserModel.findUserUserAndUpdate(userId, req.body);

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      data: "Don't find user",
    });
  }
};

exports.deleteUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log(!ObjectId.isValid(userId));

    if (!ObjectId.isValid(userId)) {
      return res.status(404).send({ message: 'Invalid id' });
    }

    await UserModel.findByIdAndRemove(userId);

    console.log(user, 'user');
    res.status(200).json({
      status: 'success',
      data: { user: null },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      data: "Don't find user",
    });
  }
};
