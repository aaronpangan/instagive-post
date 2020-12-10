const express = require('express');

const register = require('../routes/userRoutes');

module.exports = function (app, dir) {
  app.use(express.json());

  // to render input on startup
  app.get('/', (req, res) => {
    res.render('index', { warning: '', active: false });
  });

  app.use('/user', register);

  // Error
  app.use((req, res, next) => {
    res.status(404).send('PAGE NOT FOUND');
  });
};
