"use strict";
var path = require('path');
const mysql = require('mysql2')
var configdb = {
	debug: true,
	// port: 3000,
	mysql: {
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USER || "sa",
    password: process.env.DB_PASSWORD || "123456789",
    database: process.env.DB_NAME || "student"
	}
}

module.exports = configdb
