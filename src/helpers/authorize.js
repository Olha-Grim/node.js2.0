const jwt = require('jsonwebtoken');
const path = require('path');
const { Unauthorized } = require('./errors/Unauthorized');
const UserModel = require('../users/models');

require('dotenv').config({ path: path.join(__dirname, '../../.env') });

exports.authorize = async (req, res, next) => {
  let payload;
  try {
    const { token } = req.cookies;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(payload.userId);
    if (!user) {
      next(new Unauthorized("Don't have such user"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new Unauthorized('Token is not valid'));
  }
};
