const express = require("express");

const bodyParser = require("body-parser");
require("dotenv").load();
const app = express();
const port = process.env.PORT || 9000;
app.use(bodyParser.urlencoded({ extended: false  }));
app.use(bodyParser.json());
app.use(express.json());

let router = require('./routes')();
app.use("/api", router);
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port);

console.log("RESTful API server started on: " + port);
