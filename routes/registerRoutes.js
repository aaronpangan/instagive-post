const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const User = require('../model/userModel');

router.get('/', async (req, res) => {
  console.log('FROM GET');
  res.send('HELLO');
});

router.post('/', async (req, res) => {
  let user = await User.findOne({
    username: req.body.username,
  });

  if (user) return res.status(400).send('Username Already Exist');

  user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  await user.save();

  console.log(user);
  console.log(req.body.image);
  res.send(user);
});

module.exports = router;
