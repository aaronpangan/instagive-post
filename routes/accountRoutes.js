const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const userController = require('../controller/user');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/docs');
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

//  upload.fields([{name: 'imagePost'}, {name: 'imageList'}]),

router.get('/', userController.renderRequest);

router.post(
  '/',
  upload.fields([
    { name: 'orgPhoto' },
    { name: 'repId' },
    { name: 'orgDocuments' },
  ]),
  userController.requestAccount
);

module.exports = router;
