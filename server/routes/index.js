'use strict';

const apiRoute = require('./apis');

function init(server) {
	server.get('*', function (req, _, next) {
		console.log(`${req.method} request was made to: ${req.originalUrl}`);
		return next();
	});

	server.use('/api', apiRoute);
}

module.exports = {
	init: init
};