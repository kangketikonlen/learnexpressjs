'use strict';

const bcrypt = require('bcrypt'),
	services = require('../services/auth.service'),
	userService = require('../services/user.service');

let refreshTokens = [];

exports.loginRequest = async (req, res) => {
	try {
		// Call populate refresh token functions.
		await populateRefreshToken();
		// Cek data dari database apakah exists.
		let userData = await userService.one(req.body.username);
		if (!userData) return res.status(401).send({ status: "error", pesan: "Username atau password salah!" });
		// Mencocokan plain text password dari request dengan password yang terenkripsi dari database.
		const passwordIsValid = bcrypt.compareSync(req.body.password, userData.password);
		// Return error jika password tidak sesuai.
		if (!passwordIsValid) return res.status(401).send({ status: "error", pesan: "Username atau password salah!" });
		// Create session data
		let sessionData = await createToken(userData);
		return res.json({ status: "success", pesan: "Anda berhasil login!", data: { accessToken: sessionData.accessToken, refreshToken: sessionData.refreshToken } })
	} catch (e) {
		res.status(500).send({ status: "error", pesan: `${e}` });
	}
}

exports.registerRequest = async (req, res) => {
	try {
		// Mencari data dari database.
		let userExists = await userService.one(req.body.username);
		// Cek data dari database apakah exists.
		if (userExists) return res.status(403).send({ status: "error", pesan: "Username sudah digunakan!" });
		// Proses save data.
		let results = await userService.save(req.body);
		// return success if save success.
		if (results) return res.status(201).send({ status: "success", pesan: "Register berhasil!" });
	} catch (e) {
		res.status(500).send({ status: "error", pesan: `${e}` });
	}
}

exports.logoutRequest = async (req, res) => {
	if (!req.body.token) return res.status(401).send({ status: "error", pesan: "Harap sertakan token!" });
	// Hapus session
	let results = await services.delete(req.body.token);
	if (!results) return res.status(500).send({ status: "error", pesan: `${results}` });
	// Menghapus token yang dikirim pada variable token.
	refreshTokens = refreshTokens.filter(token => token !== req.body.token);
	return res.json({ status: "success", pesan: "Anda berhasil logout!" })
}

function generateAccessToken(data) {
	return jwt.sign(data, JWTsecret, { expiresIn: '60m' })
}

async function populateRefreshToken() {
	// Get all session from database.
	let sessionData = await services.all();
	if (sessionData) {
		// Populate, refreshTokens variables.
		Object.keys(sessionData).forEach(key => {
			refreshTokens.push(sessionData[key].refreshToken);
		});
	}
}

async function createToken(userData) {
	// Cari session dari database, jika ada gunakan data tersebut.
	let sessions = await services.one(userData.username);
	if (sessions) return sessions;
	// Create session dan simpan ke dalam database jika session tidak ditemukan.
	const accessToken = generateAccessToken({ nama: userData.name, level: userData.level, username: userData.username });
	const refreshToken = jwt.sign({ nama: userData.name, level: userData.level, username: userData.username }, JWTsecret2);
	refreshTokens.push(refreshToken);
	return await services.create({ username: userData.username, accessToken: accessToken, refreshToken: refreshToken });
}