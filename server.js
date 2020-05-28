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

const db = require('./config/db.config');

const role = db.role;
  
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync with { force: true }');
//   initial();
// });
 

app.listen(port);

console.log("RESTful API server started on: " + port);


function initial(){
	role.create({
		id: 1,
    Title: "USER",
    Note: 'người đăng nhâp bình thường'
	});
	
	role.create({
		id: 2,
    Title: "ADMIN",
    Note:'Quyền cao nhất'
	});
	
	role.create({
		id: 3,
    Title: "PM",
    Note:'có quyền quản lý'
  });

  role.create({
		id: 4,
    Title: "TEACHER",
    Note:'Người có quyền về điểm, môn học'
	});
}
