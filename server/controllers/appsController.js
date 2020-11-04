'use strict';

const
	services = require('../services/appsService');

exports.getAll = async (req, res, next) => {
	try {
		let results = await services.all();
		res.json({ data: results, sessions: req.decode });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server!" });
	}
}

exports.update = async (req, res, next) => {
	try {
		let data_exists = await services.findByName(req.body.apps_short_desc);
		if (data_exists.length > 0) {
			res.status(500).json({ status: "error", pesan: "Data sudah tersedia!" })
		} else {
			let findByID = await services.one(req.params.id);
			if (findByID.length > 0) {
				let results = await services.update(req.params.id, req.body);
				res.json({ data: results, sessions: req.decode });
			} else {
				res.status(404).json({ status: "Not Found!", pesan: "Data tidak ditemukan!" })
			}
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server!" });
	}
}

exports.upload = async (req, res, next) => {
	try {
		let findByID = await services.one(req.params.id);
		if (findByID.length > 0) {
			var file = req.file;
			if (!file.path) {
				res.status(401).json({ status: "Forbidden", pesan: "Tidak file untuk di upload :(" })
			}
			let results = await services.update(req.params.id, { apps_logo: "/public/uploads/images/" + file.filename });
			res.json({ data: results, sessions: req.decode });
		} else {
			res.status(404).json({ status: "Not Found!", pesan: "Data tidak ditemukan!" })
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server!" });
	}
}