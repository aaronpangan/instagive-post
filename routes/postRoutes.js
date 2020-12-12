const express = require('express');
const router = express.Router();
const postController = require('../controller/post');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    cb(
      null,

      file.fieldname +
        '-' +
        mongoose.Types.ObjectId() +
        path.extname(file.originalname)
    );
  },
});

let upload = multer({
  storage: storage,
});

router.get('/', postController.home);

router.get('/:postId', postController.viewPost);

router.post('/edittext/:postId', postController.edittext);
router.post(
  '/editprofilepic/:postId',
  upload.single('imagePost'),
  postController.editprofilepic
);
router.post('/editimagelist/:postId/:imageName', postController.editimagelist);

router.post(
  '/addrefpic/:postId',
  upload.array('imageList'),
  postController.addrefpic
);

module.exports = router;
