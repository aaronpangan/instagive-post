const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors')

require('dotenv').config();
app.use(cors())

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

// Will override the Form Method with ?_method=DELETE/PUT/PATCH in end of action
// app.use(methodOverride('_method'));

require('./startup/router')(app);
require('./startup/db')();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Port started in http://localhost:${port}`);
});
