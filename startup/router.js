const express = require('express');

const register = require('../routes/registerRoutes');

module.exports = function (app) {
  
  app.use(express.json());


  app.use("/api/register", register);
};
