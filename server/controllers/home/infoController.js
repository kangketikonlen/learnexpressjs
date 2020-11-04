'use strict';

exports.info = async (req, res, next) => {
	try {
		res.json({ status: "success", pesan: "Aplikasi berjalan dengan baik, silahkan gunakan rest client!" });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server!" });
	}
}