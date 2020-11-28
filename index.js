const express = require('express');
const app = express();


require("./startup/router")(app);
require("./startup/db")();














const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Port started in http://localhost:${port}`);
});
