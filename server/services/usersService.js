'use strict';

const
	bcrypt = require('bcrypt'),
	salt = bcrypt.genSaltSync(10);

let services = {};

services.all = () => {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM users WHERE deleted != 1`, (err, results) => {
			if (err) {
				return reject(err);
			}
			return resolve(results);
		})
	})
};

services.one = (id) => {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM users WHERE users_id = ?`, [id], (err, results) => {
			if (err) {
				return reject(err);
			}
			return resolve(results);
		})
	})
};

services.findByName = (users_login) => {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM users WHERE users_login = ?`, [users_login], (err, results) => {
			if (err) {
				return reject(err);
			}
			return resolve(results);
		})
	})
};

services.save = (usersData) => {
	return new Promise((resolve, reject) => {
		pool.query(`INSERT INTO users SET ?`, [usersData], (err) => {
			if (err) {
				return reject(err);
			}
			return resolve({ status: "Berhasil", pesan: "Data berhasil tersimpan!" });
		})
	})
}

services.update = (id, usersData) => {
	return new Promise((resolve, reject) => {
		pool.query(`UPDATE users SET ? WHERE users_id = ?`, [usersData, id], (err) => {
			if (err) {
				return reject(err);
			}
			return resolve({ status: "Berhasil", pesan: "Data berhasil terupdate!" });
		})
	})
}

services.softDel = (id) => {
	return new Promise((resolve, reject) => {
		pool.query(`UPDATE users SET deleted = 1 WHERE users_id = ?`, [id], (err) => {
			if (err) {
				return reject(err);
			}
			return resolve({ status: "Berhasil", pesan: "Data berhasil terhapus!" });
		})
	})
}

services.hardDel = (id) => {
	return new Promise((resolve, reject) => {
		pool.query(`DELETE FROM users WHERE users_id = ?`, [id], (err) => {
			if (err) {
				return reject(err);
			}
			return resolve({ status: "Berhasil", pesan: "Data terhapus secara permanen!" });
		})
	})
}

module.exports = services;