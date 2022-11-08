'use strict';

const levelModel = require("../models/level.model");

let services = {};

services.all = () => {
	return new Promise((resolve, reject) => {
		levelModel.find().then(results => {
			resolve(results);
		}).catch(err => {
			reject(err);
		})
	})
};

services.one = (name) => {
	return new Promise((resolve, reject) => {
		levelModel.findOne({ name: name }).then(results => {
			resolve(results);
		}).catch(err => {
			reject(err);
		})
	})
};

services.findByID = (id) => {
	return new Promise((resolve, reject) => {
		levelModel.findOne({ code: id }).then(results => {
			resolve(results);
		}).catch(err => {
			reject(err);
		})
	})
};

services.create = (data) => {
	return new Promise((resolve, reject) => {
		levelModel.create(data).then(results => {
			resolve(results);
		}).catch(err => {
			reject(err);
		})
	})
}

services.update = (id, data) => {
	return new Promise((resolve, reject) => {
		levelModel.findOneAndUpdate({ code: id }, data, { new: true }).then(results => {
			resolve(results);
		}).catch(err => {
			reject(err);
		})
	})
}

services.delete = (id) => {
	return new Promise((resolve, reject) => {
		levelModel.findOneAndDelete({ code: id }).then(results => {
			resolve(results);
		}).catch(err => {
			reject(err);
		})
	})
}

module.exports = services;