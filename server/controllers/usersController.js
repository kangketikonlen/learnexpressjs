'use strict';

const services = require('../services/usersService');

exports.getAll = async (req, res) => {
	try {
		let results = await services.all();
		res.json({ data: results, sessions: req.decode });
	} catch (e) {
		res.status(500).send({ status: "error", pesan: `${e}` });
	}
}

exports.getOne = async (req, res) => {
	try {
		let results = await services.one(req.params.username);
		if (!results) res.status(404).json({ status: "error", pesan: "Data tidak ditemukan!" })
		res.json({ data: results, sessions: req.decode });
	} catch (e) {
		res.status(500).send({ status: "error", pesan: `${e}` });
	}
}

exports.create = async (req, res) => {
	try {
		// Mencari data dari database.
		let userExists = await services.one(req.body.username);
		// Cek data dari database apakah exists.
		if (userExists) return res.status(403).send({ status: "error", pesan: "Username sudah digunakan!", sessions: req.decode });
		// Proses save data.
		let results = await services.save(req.body);
		// return success if save success.
		if (results) return res.status(201).send({ status: "success", pesan: "Register berhasil!", sessions: req.decode });
	} catch (e) {
		res.status(500).send({ status: "error", pesan: `${e}` });
	}
}

exports.update = async (req, res) => {
	try {
		// Cek data dari database apakah exists.
		let data = await services.one(req.params.username);
		if (!data) return res.status(404).send({ status: "error", pesan: "Data tidak ditemukan!", sessions: req.decode });
		// Periksa apakah session sama dengan username
		if (req.body.username != req.decode.username) {
			// Mencari data dari database.
			let userExists = await services.one(req.body.username);
			// Cek data dari database apakah exists.
			if (userExists) return res.status(403).send({ status: "error", pesan: "Username sudah digunakan!", sessions: req.decode });
		}
		// Proses update data.
		let results = await services.update(req.params.username, req.body);
		// return success if save success.
		if (results) return res.status(200).send({ status: "success", pesan: "Update berhasil!", sessions: req.decode });
	} catch (e) {
		res.status(500).send({ status: "error", pesan: `${e}` });
	}
}

exports.delete = async (req, res) => {
	try {
		// Cek data dari database apakah exists.
		let data = await services.one(req.params.username);
		if (!data.length) return res.status(404).send({ status: "error", pesan: "Data tidak ditemukan!", sessions: req.decode });
		// Proses delete data.
		let results = await services.delete(req.params.username);
		if (results) return res.status(200).send({ status: "success", pesan: "Data berhasil dihapus!", sessions: req.decode });
	} catch (e) {
		res.status(500).send({ status: "error", pesan: `${e}` });
	}
}