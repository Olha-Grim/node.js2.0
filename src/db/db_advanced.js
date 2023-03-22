const path = require('path');
const mongoose = require('mongoose');
const { Schema } = mongoose;

require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const main = async () => {
  await mongoose.connect(process.env.MONGODB_URL);

  const customerSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    ageStr: { type: String, required: true },
  });
  const customerModel = mongoose.model('Customer', customerSchema);
  //sort
  const sortByAge = await customerModel.find().sort({ age: -1 });
  //pagination
  const paginationOfDB = await customerModel
    .find()
    .sort({ age: 1 })
    .skip(20)
    .limit(5);


};

main();
