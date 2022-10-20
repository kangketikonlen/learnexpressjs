'use strict';

const
	bcrypt = require('bcrypt'),
	services = require('../services/authService');

let refreshTokens = []

exports.loginRequest = async (req, res) => {
	try {
		// Cek data request yang diperlukan exists.
		if (!req.body.users_login) return res.status(401).send({ status: "error", pesan: "Harap sertakan username!" });
		if (!req.body.users_pass) return res.status(401).send({ status: "error", pesan: "Harap sertakan password!" });
		// Mengambil data dari database.
		let userData = await services.findUser(req.body.users_login);
		// Cek data dari database apakah exists.
		if (!userData.length) return res.status(401).send({ status: "error", pesan: "Username atau password salah!" });
		// Mencocokan plain text password dari request dengan password yang terenkripsi dari database.
		const passwordIsValid = bcrypt.compareSync(req.body.users_pass, userData[0].users_pass);
		// Return error jika password tidak sesuai.
		if (!passwordIsValid) return res.status(401).send({ status: "error", pesan: "Username atau password salah!" });
		// Lanjut ke proses generate access token, jika username dan password valid.
		const accessToken = generateAccessToken({
			id: userData[0].users_id,
			level: userData[0].levels_id,
			nama: userData[0].users_name
		});
		// Generate refresh token, JWTsecret2 telah diset di ./configs/development/index.js.
		const refreshToken = jwt.sign({
			id: userData[0].users_id,
			level: userData[0].levels_id,
			nama: userData[0].users_name
		}, JWTsecret2)
		// Push atau assign token ke variable refreshToken.
		refreshTokens.push(refreshToken)
		// Return access token dan refresh token ke client.
		res.json({ accessToken: accessToken, refreshToken: refreshToken })
	} catch (e) {
		console.log(e);
		res.status(500).send({ status: "error", pesan: "Kesalahan terjadi di sisi server!" });
	}
}

exports.tokenRequest = async (req, res) => {
	// Assign request token ke variable refreshToken.
	const refreshToken = req.body.token
	// Cek variable refreshToken tidak kosong.
	if (!refreshToken) return res.status(401).send({ status: "error", pesan: "Harap sertakan refresh roken!" });
	// Periksa apakah token yang direquest ada pada variable array refreshTokens.
	if (!refreshTokens.includes(refreshToken)) return res.status(403).send({ status: "error", pesan: "Token belum teregistrasi!" });
	// Proses validasi refresh token menggunakan jwt.
	jwt.verify(refreshToken, JWTsecret2, (err, sessions) => {
		// Return forbidden jika terjadi error.
		if (err) return res.status(403).send({ status: "error", pesan: "Terjadi kesalahan di sisi server!" });
		// Return accessToken.
		const accessToken = generateAccessToken({ sessions })
		res.json({ accessToken: accessToken, session: sessions })
	})
}

exports.logoutRequest = async (req, res) => {
	if (!req.body.token) return res.status(401).send({ status: "error", pesan: "Harap sertakan token!" })
	// Menghapus token yang dikirim pada variable token.
	refreshTokens = refreshTokens.filter(token => token !== req.body.token)
	res.sendStatus(204)
}

function generateAccessToken(data) {
	return jwt.sign(data, JWTsecret, { expiresIn: '1d' })
}