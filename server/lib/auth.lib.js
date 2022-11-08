module.exports = function () {
	let authToken = function (req, res, next) {
		// Set token from header.
		const token = req.headers['authorization'];
		// Check if token exists.
		if (!token) return res.status(401).send({ status: "error", pesan: 'Token tidak ditemukan.' });
		// Verify token with JWTsecret.
		jwt.verify(token.replace(/Bearer /g, ""), JWTsecret, function (err, decode) {
			// Return error if expired or malfunction.
			if (err) return res.status(500).send({ status: "error", message: err.message });
			// Add session to requests.
			req.decode = decode;
			// Check if level eligible to access.
			if (decode.level.toLowerCase() == "admin") {
				next();
			} else {
				res.status(403).json({ status: "error", pesan: "Anda tidak berhak mengakses modul." })
			}
		})
	}

	return {
		authToken: authToken
	}
}