const express = require('express');
const router = express.Router();
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

const userController = require('../controller/user');
const postController = require('../controller/post');

router.post('/register', userController.register);
router.post('/login', userController.login);

// Verify the Cookie and JWT first
router.get(
  '/home',
  [userController.verifyCookie, userController.verifyToken],
  userController.home
);

router.post(
  '/create',
  [
    userController.verifyCookie,
    userController.verifyToken,
    upload.fields([{name: 'imagePost'}, {name: 'imageList'}]),
  ],
  postController.createPost
);

router.get('/logout', userController.logout);

module.exports = router;

router.get('/', userController.home);
