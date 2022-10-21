'use strict';

const sessionModel = require("../models/session.model");
const userModel = require("../models/user.model");

let services = {};

services.getAllSessions = () => {
	return new Promise((resolve, reject) => {
		sessionModel.find().then(data => {
			return resolve(data);
		}).catch(err => {
			return reject(err);
		})
	})
}

services.findUser = (username) => {
	return new Promise((resolve, reject) => {
		userModel.findOne({ username: username }).then(data => {
			return resolve(data);
		}).catch(err => {
			return reject(err);
		})
	})
};

services.findByName = (username) => {
	return new Promise((resolve, reject) => {
		userModel.findOne({ username: username }).then(data => {
			return resolve(data);
		}).catch(err => {
			return reject(err);
		})
	})
};

services.findSession = (username) => {
	return new Promise((resolve, reject) => {
		sessionModel.findOne({ username: username }).then(data => {
			return resolve(data);
		}).catch(err => {
			return reject(err);
		})
	})
};

services.saveData = (data) => {
	return new Promise((resolve, reject) => {
		userModel.create(data).then(results => {
			return resolve(results);
		}).catch(err => {
			return reject(err);
		});
	})
};

services.saveSession = (data) => {
	return new Promise((resolve, reject) => {
		sessionModel.create(data).then(results => {
			return resolve(results);
		}).catch(err => {
			return reject(err);
		});
	})
};

services.removeSession = (token) => {
	return new Promise((resolve, reject) => {
		sessionModel.findOneAndRemove({ refreshToken: token }).then(results => {
			return resolve(results);
		}).catch(err => {
			return reject(err);
		});
	});
}

module.exports = services;