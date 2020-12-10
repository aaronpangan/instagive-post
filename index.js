const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

require('dotenv').config();
app.set('view engine', 'ejs');





app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

require('./startup/router')(app);
require('./startup/db')();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Port started in http://localhost:${port}`);
});
