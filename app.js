var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var port = 3000;

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(require("cors")())
app.use(express.static('./src/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./src/routes/menu.js")(app);
require("./src/routes/order.js")(app);
require("./src/routes/pages.js")(app);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});