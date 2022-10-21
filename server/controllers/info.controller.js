'use strict';

exports.info = async (_, res) => {
	try {
		res.json({ status: "success", pesan: "Aplikasi berjalan dengan baik!" });
	} catch (e) {
		res.status(500).send({ status: "error", pesan: `${e}` });
	}
}