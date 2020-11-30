const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

require('./startup/router')(app, __dirname);
require('./startup/db')();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Port started in http://localhost:${port}`);
});
