'use strict';

let services = {};

services.findUser = (users_login) => {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM users WHERE users_login = ?`, [users_login], (err, results) => {
			if (err) {
				return reject(err);
			}
			return resolve(results);
		})
	})
};

module.exports = services;