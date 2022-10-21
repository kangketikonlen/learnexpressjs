'use strict';

const
	bcrypt = require('bcrypt'),
	salt = bcrypt.genSaltSync(10),
	services = require('../services/authService');

let refreshTokens = [];

exports.loginRequest = async (req, res) => {
	try {
		// Call populate refresh token functions.
		await populateRefreshToken();
		// Mengambil data dari database.
		let userData = await services.findUser(req.body.username);
		// Cek data dari database apakah exists.
		if (!userData) return res.status(401).send({ status: "error", pesan: "Username atau password salah!" });
		// Mencocokan plain text password dari request dengan password yang terenkripsi dari database.
		const passwordIsValid = bcrypt.compareSync(req.body.password, userData.password);
		// Return error jika password tidak sesuai.
		if (!passwordIsValid) return res.status(401).send({ status: "error", pesan: "Username atau password salah!" });
		// Search session from database.
		let sessionData = await services.findSession(userData.username);
		if (sessionData) return res.json({ status: "success", pesan: "Anda berhasil login!", data: { accessToken: sessionData.accessToken, refreshToken: sessionData.refreshToken } })
		// Lanjut ke proses generate token.
		const accessToken = generateAccessToken({
			nama: userData.name,
			level: userData.level,
			username: userData.username
		});
		// Generate refresh token, JWTsecret2 telah diset di ./configs/development/index.js.
		const refreshToken = jwt.sign({
			nama: userData.name,
			level: userData.level,
			username: userData.username
		}, JWTsecret2)
		// Push atau assign token ke variable refreshToken.
		refreshTokens.push(refreshToken)
		// Save session to database
		sessionData = await services.saveSession({
			username: userData.username,
			accessToken: accessToken,
			refreshToken: refreshToken
		});
		// Return access token dan refresh token ke client.
		return res.json({ status: "success", pesan: "Anda berhasil login!", data: { accessToken: sessionData.accessToken, refreshToken: sessionData.refreshToken } })
	} catch (e) {
		res.status(500).send({ status: "error", pesan: `${e}` });
	}
}

exports.registerRequest = async (req, res) => {
	try {
		// Mencari data dari database.
		let userExists = await services.findByName(req.body.username);
		// Cek data dari database apakah exists.
		if (userExists) return res.status(403).send({ status: "error", pesan: "Username sudah digunakan!" });
		// Hash passwords
		Object.assign(req.body, {
			password: bcrypt.hashSync(req.body.password, salt)
		});
		// Proses save data.
		let results = await services.saveData(req.body);
		// return success if save success.
		if (results) return res.status(201).send({ status: "success", pesan: "Register berhasil!" });
	} catch (e) {
		res.status(500).send({ status: "error", pesan: `${e}` });
	}
}

exports.tokenRequest = async (req, res) => {
	// Call populate refresh token functions.
	await populateRefreshToken();
	// Assign request token ke variable refreshToken.
	const refreshToken = req.body.token
	// Cek variable refreshToken tidak kosong.
	if (!refreshToken) return res.status(401).send({ status: "error", pesan: "Harap sertakan refresh roken!" });
	// Periksa apakah token yang direquest ada pada variable array refreshTokens.
	if (!refreshTokens.includes(refreshToken)) return res.status(403).send({ status: "error", pesan: "Token belum teregistrasi!" });
	// Proses validasi refresh token menggunakan jwt.
	jwt.verify(refreshToken, JWTsecret2, (err, sessions) => {
		// Return forbidden jika terjadi error.
		if (err) return res.status(403).send({ status: "error", pesan: `Terjadi kesalahan di sisi server! ${err}` });
		// Return accessToken.
		const accessToken = generateAccessToken({ sessions })
		res.json({ accessToken: accessToken, session: sessions })
	});
}

exports.logoutRequest = async (req, res) => {
	if (!req.body.token) return res.status(401).send({ status: "error", pesan: "Harap sertakan token!" });
	// Hapus session
	try {
		await services.removeSession(req.body.token);
	} catch (e) {
		res.status(500).send({ status: "error", pesan: `${e}` });
	}
	// Menghapus token yang dikirim pada variable token.
	refreshTokens = refreshTokens.filter(token => token !== req.body.token);
	return res.json({ status: "success", pesan: "Anda berhasil logout!" })
}

function generateAccessToken(data) {
	return jwt.sign(data, JWTsecret, { expiresIn: '1m' })
}

async function populateRefreshToken() {
	// Get all session from database.
	let sessionData = await services.getAllSessions();
	if (sessionData) {
		// Populate, refreshTokens variables.
		Object.keys(sessionData).forEach(key => {
			refreshTokens.push(sessionData[key].refreshToken);
		});
	}
}