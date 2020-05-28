const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const db = require('../config/db.config.js');
const role = db.role;
const account = db.account;

verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token'];
  
	if (!token){
		return res.status(403).send({ 
			auth: false, message: 'No token provided.' 
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err){
			return res.status(500).send({ 
					auth: false, 
					message: 'Fail to Authentication. Error -> ' + err 
				});
		}
		req.account_Id = decoded.id;
		next();
	});
}

isAdmin = (req, res, next) => {
	let token = req.headers['x-access-token'];
	
	account.findById(req.account_Id)
		.then(account => {
			account.getRoles().then(roles => {
				for(let i=0; i<roles.length; i++){
					console.log(roles[i].name);
					if(roles[i].name.toUpperCase() === "ADMIN"){
						next();
						return;
					}
				}
				
				res.status(403).send("Require Admin Role!");
				return;
			})
		})
}

isPmOrAdmin = (req, res, next) => {
	let token = req.headers['x-access-token'];
	
	account.findById(req.account_Id)
		.then(account => {
			account.getRoles().then(roles => {
				for(let i=0; i<roles.length; i++){					
					if(roles[i].name.toUpperCase() === "PM"){
						next();
						return;
					}
					
					if(roles[i].name.toUpperCase() === "ADMIN"){
						next();
						return;
					}
				}
				
				res.status(403).send("Require PM or Admin Roles!");
			})
		})
}


isTeacher =  (req, res, next) => {
	let token = req.headers['x-access-token'];
	
	account.findById(req.account_Id)
		.then(account => {
			account.getRoles().then(roles => {
				for(let i=0; i<roles.length; i++){
					console.log(roles[i].name);
					if(roles[i].name.toUpperCase() === "TEACHER"){
						next();
						return;
					}
				}
				
				res.status(403).send("Require TEACHER Role!");
				return;
			})
		})
}

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;
authJwt.isPmOrAdmin = isPmOrAdmin;
authJwt.isTeacher = isTeacher;

module.exports = authJwt;
