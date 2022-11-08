'use strict';

const services = require('../services/app.service');

exports.getAll = async (_req, res) => {
	try {
		let results = await services.all();
		res.send({ status: "success", pesan: "Request berhasil!", data: results });
	} catch (e) {
		res.status(500).send({ status: "error", pesan: `${e}` });
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
		if (!results) return res.status(404).json({ status: "error", pesan: "Data tidak ditemukan!" })
		res.send({ status: "success", pesan: "Request berhasil!", data: results });
	} catch (e) {
		res.status(500).send({ status: "error", pesan: `${e}` });
	}
}

exports.create = async (req, res) => {
	try {
		// Cek data dari database apakah exists.
		let apps = await services.one(req.body.name);
		if (apps) return res.status(401).json({ status: "error", pesan: "Nama sudah ada!" });
		// Assign path logo dan background ke dalam object body.
		req.body.logo = "/public/uploads/images/" + req.files[0].filename;
		req.body.background = "/public/uploads/images/" + req.files[1].filename;
		// Proses save data.
		let results = await services.create(req.body);
		if (results) return res.status(201).send({ status: "success", pesan: "Data berhasil disimpan!", data: results });
	} catch (e) {
		res.status(500).send({ status: "error", pesan: `${e}` });
	}
}

exports.update = async (req, res) => {
	try {
		// Cek data dari database apakah exists.
		let isExists = await services.findByID(req.params.id);
		if (!isExists) return res.status(404).json({ status: "error", pesan: "Data tidak ditemukan!" });
		// Cek data dari database apakah exists.
		let apps = await services.one(req.body.name);
		if (apps) return res.status(401).json({ status: "error", pesan: "Nama sudah ada!" });
		// Assign path logo dan background ke dalam object body.
		req.body.logo = "/public/uploads/images/" + req.files[0].filename;
		req.body.background = "/public/uploads/images/" + req.files[1].filename;
		// Proses update data.
		let results = await services.update(req.params.id, req.body);
		if (results) return res.status(201).send({ status: "success", pesan: "Data berhasil diupdate!", data: results });
	} catch (e) {
		res.status(500).send({ status: "error", pesan: `${e}` });
	}
}

exports.delete = async (req, res) => {
	try {
		// Cek data dari database apakah exists.
		let isExists = await services.findByID(req.params.id);
		if (!isExists) return res.status(404).json({ status: "error", pesan: "Data tidak ditemukan!" });
		// Proses delete data.
		let results = await services.delete(req.params.id);
		if (results) return res.status(201).send({ status: "success", pesan: "Data berhasil dihapus!" });
	} catch (e) {
		res.status(500).send({ status: "error", pesan: `${e}` });
	}
}