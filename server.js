const express = require("express");
const app = express();
var session = require('express-session');
const bodyParser = require("body-parser");
require("dotenv").load();
const port = process.env.PORT || 9000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
let router = require("./api/routes")();
app.use("/api", router);
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});
app.listen(port);

console.log("RESTful API server started on: " + port);
