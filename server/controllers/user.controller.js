'use strict';

const services = require('../services/user.service');

exports.getAll = async (_req, res) => {
	try {
		let results = await services.all();
		res.send({ status: "success", message: "Request berhasil!", data: results });
	} catch (e) {
		res.status(500).send({ status: "error", message: `${e}` });
	}
}

exports.genCode = async (_req, res) => {
	try {
		let results = await services.all();
		let length = (results.length + 1).toString();
		let code = `TKO-${length.padStart(4, "0")}`;
		res.send({ status: "success", message: "Request berhasil!", data: { code: code } });
	} catch (e) {
		res.status(500).send({ status: "error", message: `${e}` });
	}
}

exports.getOne = async (req, res) => {
	try {
		let results = await services.findByID(req.params.id);
		if (!results) res.status(404).json({ status: "error", message: "Data tidak ditemukan!" })
		res.send({ status: "success", message: "Request berhasil!", data: results });
	} catch (e) {
		res.status(500).send({ status: "error", message: `${e}` });
	}
}

exports.create = async (req, res) => {
	try {
		// Mencari data dari database.
		let userExists = await services.findByID(req.body.id);
		// Cek data dari database apakah exists.
		if (userExists) return res.status(403).send({ status: "error", message: "Data sudah ada!" });
		// Proses save data.
		let results = await services.save(req.body);
		// return success if save success.
		if (results) return res.status(201).send({ status: "success", message: "Data berhasil disimpan!", data: results });
	} catch (e) {
		res.status(500).send({ status: "error", message: `${e}` });
	}
}

exports.update = async (req, res) => {
	try {
		// Cek data dari database apakah exists.
		let data = await services.findByID(req.params.id);
		if (!data) return res.status(404).send({ status: "error", message: "Data tidak ditemukan!" });
		// Periksa apakah session sama dengan username
		if (req.body.username != req.decode.username) {
			// Mencari data dari database.
			let userExists = await services.one(req.body.username);
			// Cek data dari database apakah exists.
			if (userExists) return res.status(403).send({ status: "error", message: "Username sudah digunakan!" });
		}
		// Proses update data.
		let results = await services.update(req.params.id, req.body);
		// return success if save success.
		if (results) return res.status(200).send({ status: "success", message: "Update berhasil!", data: results });
	} catch (e) {
		res.status(500).send({ status: "error", message: `${e}` });
	}
}

exports.delete = async (req, res) => {
	try {
		// Cek data dari database apakah exists.
		let data = await services.findByID(req.params.id);
		if (!data) return res.status(404).send({ status: "error", message: "Data tidak ditemukan!" });
		// Proses delete data.
		let results = await services.delete(req.params.id);
		if (results) return res.status(200).send({ status: "success", message: "Data berhasil dihapus!" });
	} catch (e) {
		res.status(500).send({ status: "error", message: `${e}` });
	}
}