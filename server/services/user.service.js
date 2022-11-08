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
		userModel.findOne({ username: username }).then(results => {
			resolve(results);
		}).catch(err => {
			reject(err);
		});
	})
};

services.findByID = (id) => {
	return new Promise((resolve, reject) => {
		userModel.findOne({ code: id }).then(results => {
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

services.update = (id, data) => {
	return new Promise((resolve, reject) => {
		userModel.findOneAndUpdate({ code: id }, data, { new: true }).then(results => {
			return resolve(results);
		}).catch(err => {
			return reject(err);
		})
	})
}

services.delete = (id) => {
	return new Promise((resolve, reject) => {
		userModel.findOneAndDelete({ code: id }).then(results => {
			return resolve(results);
		}).catch(err => {
			return reject(err);
		})
	})
}

module.exports = services;