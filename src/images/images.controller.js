const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const path = require('path');

exports.uploadImage = async (req, res, next) => {
  try {
    console.log(req.file, 'file');
    console.log(req.body, 'body');
  } catch (error) {
    console.log(error);
  }

  return res.send('hello');
};

exports.compressImage = async (req, res, next) => {
  const normalizePath = req.file.path.replace(/\\/g, '/');
  const COMPRESSED_IMAGES_DIR = 'uploads';

  await imagemin([normalizePath], {
    destination: COMPRESSED_IMAGES_DIR,
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  });

  req.file.destination = COMPRESSED_IMAGES_DIR;
  req.file.path = path.join(COMPRESSED_IMAGES_DIR, req.file.filename);
};
