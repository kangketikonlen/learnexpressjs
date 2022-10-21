'use strict';

const services = require('../services/levelsService');

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
		let results = await services.findByID(req.params.id);
		if (!results) return res.status(404).json({ status: "error", pesan: "Data tidak ditemukan!" })
		res.json({ data: results, sessions: req.decode });
	} catch (e) {
		res.status(500).send({ status: "error", pesan: `${e}` });
	}
}

exports.create = async (req, res) => {
	try {
		// Cek data dari database apakah exists.
		let level = await services.one(req.body.name);
		if (level) return res.status(401).json({ status: "error", pesan: "Data sudah ada!", sessions: req.decode });
		// Proses save data.
		let results = await services.create(req.body);
		if (results) return res.status(201).send({ status: "success", pesan: "Data berhasil disimpan!", sessions: req.decode });
	} catch (e) {
		res.status(500).send({ status: "error", pesan: `${e}` });
	}
}

exports.update = async (req, res) => {
	try {
		// Cek data dari database apakah exists.
		let isExists = await services.findByID(req.params.id);
		if (!isExists) return res.status(404).json({ status: "error", pesan: "Data tidak ditemukan!", sessions: req.decode });
		// Cek data dari database apakah exists.
		let data = await services.one(req.body.name);
		if (data) return res.status(401).json({ status: "error", pesan: "Nama sudah ada!", sessions: req.decode });
		// Proses update data.
		let results = await services.update(req.params.id, req.body);
		if (results) return res.status(201).send({ status: "success", pesan: "Data berhasil diupdate!", sessions: req.decode });
	} catch (e) {
		res.status(500).send({ status: "error", pesan: `${e}` });
	}
}

exports.delete = async (req, res) => {
	try {
		// Cek data dari database apakah exists.
		let isExists = await services.findByID(req.params.id);
		if (!isExists) return res.status(404).json({ status: "error", pesan: "Data tidak ditemukan!", sessions: req.decode });
		// Proses delete data.
		let results = await services.delete(req.params.id);
		if (results) return res.status(201).send({ status: "success", pesan: "Data berhasil dihapus!", sessions: req.decode });
	} catch (e) {
		res.status(500).send({ status: "error", pesan: `${e}` });
	}
}