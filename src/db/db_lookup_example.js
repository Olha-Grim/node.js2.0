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
      },
    },
  ]);

  //   const takeData = aggregate.map(viewer => viewer.favoriteFilms)

  //   .map(viewer => viewer.favoriteFilms)
  //   ViewerModel.create(
  //     {
  //       _id: 1,
  //       name: 'Ivan',
  //       favoriteFilmIds: ['1', '3'],
  //     },
  //     {
  //       _id: 2,
  //       name: 'Taras',
  //       favoriteFilmIds: ['1', '2'],
  //     },
  //     {
  //       _id: 3,
  //       name: 'Sergio',
  //     },
  //   );
  //   FilmModel.create(
  //     {
  //       _id: 1,
  //       name: 'Titanic',
  //       genre: 'drama',
  //     },
  //     {
  //       _id: 2,
  //       name: 'Lord of rings',
  //       genre: 'fantasy',
  //     },
  //     {
  //       _id: 3,
  //       name: 'Superman',
  //       genre: 'fantasy',
  //     },
  //     {
  //       _id: 4,
  //       name: null,
  //     },
  //   );

  //aggregate
};

main();
