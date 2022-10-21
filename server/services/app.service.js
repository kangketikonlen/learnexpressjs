'use strict';

const appModel = require("../models/app.model");

let services = {};

services.all = () => {
	return new Promise((resolve, reject) => {
		appModel.find().then(results => {
			resolve(results);
		}).catch(err => {
			reject(err);
		})
	})
};

services.one = (name) => {
	return new Promise((resolve, reject) => {
		appModel.findOne({ name: name }).then(results => {
			resolve(results);
		}).catch(err => {
			reject(err);
		})
	})
};

services.findByID = (id) => {
	return new Promise((resolve, reject) => {
		appModel.findById(id).then(results => {
			resolve(results);
		}).catch(err => {
			reject(err);
		})
	})
};

services.create = (data) => {
	return new Promise((resolve, reject) => {
		appModel.create(data).then(results => {
			resolve(results);
		}).catch(err => {
			reject(err);
		})
	})
}

services.update = (id, data) => {
	return new Promise((resolve, reject) => {
		appModel.findByIdAndUpdate(id, data).then(results => {
			resolve(results);
		}).catch(err => {
			reject(err);
		})
	})
}

services.delete = (id) => {
	return new Promise((resolve, reject) => {
		appModel.findByIdAndDelete(id).then(results => {
			resolve(results);
		}).catch(err => {
			reject(err);
		})
	})
}

module.exports = services;