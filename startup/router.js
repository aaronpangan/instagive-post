const express = require('express');



const register = require('../routes/registerRoutes');


module.exports = (app) => {

app.use("/api/register", register);


}