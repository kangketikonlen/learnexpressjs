'use strict';

let localConfig = {
	hostname: process.env.HOST || "localhost",
	port: process.env.PORT || "3000",
	dbURI: process.env.MONGODB_URI || "mongodb://localhost:27017/sample",
	JWTsecret: process.env.SECRET1 || "behindyou",
	JWTsecret2: process.env.SECRET2 || "frontyou"
};

module.exports = localConfig;