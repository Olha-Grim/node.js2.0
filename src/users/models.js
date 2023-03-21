const mongoose = require('mongoose');

const { Schema } = mongoose;

const userScheme = new Schema({
  email: { type: String, required: true, default: 'noname', unique: true },
  name: { type: String, required: true },
  films: [{ type: String }],
  password: { type: String, required: true },
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
