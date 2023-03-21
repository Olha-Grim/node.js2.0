const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const userScheme = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, default: 'noName' },
  password: { type: String, required: true, min: 8 },
  films: [{ type: String }],
});

const findUserUserAndUpdate = async (userId, upDateParams) => {
  return await this.findByIdAndUpdate(
    userId,
    { $set: upDateParams },
    { new: true },
  );
};

userScheme.statics.findUserByIdAndUpdate = findUserUserAndUpdate;

const UserModel = mongoose.model(process.env.DB_COLLECTION, userScheme);

module.exports = UserModel;
