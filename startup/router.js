const express = require('express');

const register = require('../routes/userRoutes');
const home = require('../routes/postRoutes');
const request = require('../routes/accountRoutes')
const donate = require('../routes/donateRoutes')
const admin = require('../routes/adminRoutes')


module.exports = function (app, dir) {
  app.use(express.json());

  // to render input on startup
  app.get('/', (req, res) => {
    if (req.cookies.user) {
      res.redirect('/user/home');
    } else res.render('index', { warning: '', active: false });
  });

  app.use('/user/post', home);
  app.use('/user', register);
  app.use('/landing', home);
  app.use('/request', request)
  app.use('/donate', donate)
  app.use('/admin', admin)

  // Error
  app.use((req, res, next) => {
    res.status(404).send('PAGE NOT FOUND');
  });
};
