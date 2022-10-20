'use strict';

const
	express = require('express'),
	mongoose = require('mongoose'),
	helmet = require('helmet'),
	bodyParser = require('body-parser'),
	google = require('googleapis').google,
	jwt = require('jsonwebtoken'),
	cors = require('cors'),
	morgan = require('morgan'),
	logConfig = require('../configs/log')

module.exports = function () {
	let server = express(),
		create,
		start;

	create = function (config) {
		let routes = require('./routes');

		// Server settings
		server.set('env', config.env);
		server.set('port', config.port);
		server.set('dbURI', config.dbURI);
		server.set('hostname', config.hostname);
		server.set('oauth2Credentials', config.oauth2Credentials);
		server.set('JWTsecret', config.JWTsecret);
		server.set('JWTsecret2', config.JWTsecret2);
		server.set('trust proxy', 1);
		server.disable('x-powered-by');

		// Returns middleware
		server.use(morgan('[:date[web]] :status - :remote-addr - :method - :url - :response-time ms - :user-agent', { stream: logConfig.stream }))
		server.use(helmet());
		server.use(cors());
		server.use(bodyParser.json({
			limit: '50mb'
		}));
		server.use(bodyParser.urlencoded({
			limit: '50mb',
			extended: true
		}));

		// Set up routes
		routes.init(server);
	};

	start = function () {
		let hostname = server.get('hostname'),
			port = server.get('port');

		global.oauth2Credentials = server.get('oauth2Credentials');
		global.JWTsecret = server.get('JWTsecret');
		global.JWTsecret2 = server.get('JWTsecret2');
		global.OAuth2 = google.auth.OAuth2;
		global.jwt = jwt;
		global.google = google;

		mongoose.connect(server.get('dbURI'), {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(() => {
			console.log("Connected to the database!");
		}).catch(err => {
			console.log("Cannot connect to the database!", err);
			process.exit();
		});

		server.listen(port, function () {
			try {
				console.log(`Express server listening on - http://${hostname}:${port}`);
			} catch (e) {
				console.log(e);
			}
		});
	};

	return {
		create: create,
		start: start
	};
};