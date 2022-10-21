'use strict';

const sessionModel = require("../models/session.model");
const userModel = require("../models/user.model");

let services = {};

services.all = () => {
	return new Promise((resolve, reject) => {
		sessionModel.find().then(data => {
			return resolve(data);
		}).catch(err => {
			return reject(err);
		})
	})
}

services.one = (username) => {
	return new Promise((resolve, reject) => {
		sessionModel.findOne({ username: username }).then(data => {
			return resolve(data);
		}).catch(err => {
			return reject(err);
		})
	})
};

services.create = (data) => {
	return new Promise((resolve, reject) => {
		sessionModel.create(data).then(results => {
			return resolve(results);
		}).catch(err => {
			return reject(err);
		});
	})
};

services.delete = (token) => {
	return new Promise((resolve, reject) => {
		sessionModel.findOneAndRemove({ refreshToken: token }).then(results => {
			return resolve(results);
		}).catch(err => {
			return reject(err);
		});
	});
}

module.exports = services;