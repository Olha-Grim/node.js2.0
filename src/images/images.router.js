const { Router } = require('express');
const multer = require('multer');
const imageRouter = Router();
const ImagesController = require('./images.controller');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'tmp',
  filename: (req, file, cb) => {
    const { originalname } = file;
    const { ext } = path.parse(originalname);
    return cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

imageRouter.post(
  '/upload',
  upload.single('avatar'),
  ImagesController.uploadImage,
);

module.exports = imageRouter;
