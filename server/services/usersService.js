'use strict';

const userModel = require('../models/user.model');

let services = {};

services.all = () => {
	return new Promise((resolve, reject) => {
		userModel.find().then(results => {
			resolve(results);
		}).catch(err => {
			reject(err);
		});
	})
};

services.one = (username) => {
	return new Promise((resolve, reject) => {
		userModel.find({ username: username }).then(results => {
			resolve(results);
		}).catch(err => {
			reject(err);
		});
	})
};

services.save = (data) => {
	return new Promise((resolve, reject) => {
		userModel.create(data).then(results => {
			return resolve(results);
		}).catch(err => {
			return reject(err);
		});
	})
}

services.update = (username, data) => {
	return new Promise((resolve, reject) => {
		userModel.findOneAndUpdate({ username: username }, data).then(results => {
			return resolve(results);
		}).catch(err => {
			return reject(err);
		})
	})
}

services.delete = (username) => {
	return new Promise((resolve, reject) => {
		userModel.findOneAndDelete({ username: username }).then(results => {
			return resolve(results);
		}).catch(err => {
			return reject(err);
		})
	})
}

module.exports = services;