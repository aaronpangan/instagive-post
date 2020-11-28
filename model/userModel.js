const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },

  password: String,
});

const User = mongoose.model('users', userSchema);

exports.User = User;
