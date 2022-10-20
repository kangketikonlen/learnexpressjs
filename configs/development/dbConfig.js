const mysql = require('mysql');

const connDb = mysql.createPool({
	connectionLimit: 10,
	host: "localhost",
	port: "3306",
	user: "root",
	password: "older45.,",
	database: "sample-expressjs"
});

module.exports = { connDb: connDb }