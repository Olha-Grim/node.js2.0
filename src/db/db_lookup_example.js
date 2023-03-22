const path = require('path');
const mongoose = require('mongoose');
const { Schema } = mongoose;

require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const main = async () => {
  //aggregate
  await mongoose.connect(process.env.MONGODB_URL);

  const viewerSchema = new Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    favoriteFilmIds: [{ type: Number }],
  });

  const filmSchema = new Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: false },
    genre: { type: String, required: false },
  });

  const FilmModel = mongoose.model('Film', filmSchema);
  const ViewerModel = mongoose.model('Viewer', viewerSchema);

  const aggregate = await ViewerModel.aggregate([
    {
      $lookup: {
        //collection name
        from: 'films',
        localField: 'favoriteFilmIds',
        foreignField: '_id',
        as: 'favoriteFilms',
      },
    },
    {
      $project: {
        favoriteFilms: 1,
        _id: 0,
      },
    },
  ]);
  console.log(aggregate, 'aggregate');
};

main();
