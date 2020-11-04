'use strict';

let services = {};

services.all = () => {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM apps WHERE deleted != 1`, (err, results) => {
			if (err) {
				return reject(err);
			}
			return resolve(results);
		})
	})
};

services.one = (id) => {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM apps WHERE apps_id = ?`, [id], (err, results) => {
			if (err) {
				return reject(err);
			}
			return resolve(results);
		})
	})
};


services.findByName = (apps_short_desc) => {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM apps WHERE apps_short_desc = ?`, [apps_short_desc], (err, results) => {
			if (err) {
				return reject(err);
			}
			return resolve(results);
		})
	})
};

services.update = (id, appsData) => {
	return new Promise((resolve, reject) => {
		pool.query(`UPDATE apps SET ? WHERE apps_id = ?`, [appsData, id], (err) => {
			if (err) {
				return reject(err);
			}
			return resolve({ status: "Berhasil", pesan: "Data berhasil terupdate!" });
		})
	})
}

module.exports = services;