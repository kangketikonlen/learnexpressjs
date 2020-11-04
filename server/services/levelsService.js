'use strict';

let services = {};

services.all = () => {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM levels WHERE deleted != 1`, (err, results) => {
			if (err) {
				return reject(err);
			}
			return resolve(results);
		})
	})
};

services.one = (id) => {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM levels WHERE levels_id = ?`, [id], (err, results) => {
			if (err) {
				return reject(err);
			}
			return resolve(results);
		})
	})
};

services.findByName = (levels_name) => {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM levels WHERE levels_name = ?`, [levels_name], (err, results) => {
			if (err) {
				return reject(err);
			}
			return resolve(results);
		})
	})
};

services.save = (levelsData) => {
	return new Promise((resolve, reject) => {
		pool.query(`INSERT INTO levels SET ?`, [levelsData], (err) => {
			if (err) {
				return reject(err);
			}
			return resolve({ status: "Berhasil", pesan: "Data berhasil tersimpan!" });
		})
	})
}

services.update = (id, levelsData) => {
	return new Promise((resolve, reject) => {
		pool.query(`UPDATE levels SET ? WHERE levels_id = ?`, [levelsData, id], (err) => {
			if (err) {
				return reject(err);
			}
			return resolve({ status: "Berhasil", pesan: "Data berhasil terupdate!" });
		})
	})
}

services.softDel = (id) => {
	return new Promise((resolve, reject) => {
		pool.query(`UPDATE levels SET deleted = 1 WHERE levels_id = ?`, [id], (err) => {
			if (err) {
				return reject(err);
			}
			return resolve({ status: "Berhasil", pesan: "Data berhasil terhapus!" });
		})
	})
}

services.hardDel = (id) => {
	return new Promise((resolve, reject) => {
		pool.query(`DELETE FROM levels WHERE levels_id = ?`, [id], (err) => {
			if (err) {
				return reject(err);
			}
			return resolve({ status: "Berhasil", pesan: "Data terhapus secara permanen!" });
		})
	})
}

module.exports = services;