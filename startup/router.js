const express = require('express');

const register = require('../routes/registerRoutes');

module.exports = function (app, dir) {
  app.use(express.json());


// to render input on startup
app.get('/', (req, res) => {
  res.sendFile(dir +'/view/input.html');
});



  app.use('/api/register', register);
};
