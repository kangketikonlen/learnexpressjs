'use strict';

const apiRoute = require('./v1');

function init(server) {
	server.get('*', function (req, _, next) {
		console.log(`${req.method} request was made to: ${req.originalUrl}`);
		return next();
	});
	server.use('/v1', apiRoute);
}

module.exports = {
	init: init
};