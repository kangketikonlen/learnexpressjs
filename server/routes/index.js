'use strict';

const
	apiRoute = require('./apis'),
	homeRoute = require('./home')

function init(server) {
	server.get('*', function (req, res, next) {
		console.log('Request was made to: ' + req.originalUrl);
		return next();
	});

	server.use('/', homeRoute);
	server.use('/api', apiRoute);
}

module.exports = {
	init: init
};