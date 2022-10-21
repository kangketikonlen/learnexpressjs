'use strict';

const
	_ = require('lodash'),
	env = process.env.NODE_ENV || 'development',
	envConfig = require('./variables');

let defaultConfig = {
	env: env
};

module.exports = _.merge(defaultConfig, envConfig);