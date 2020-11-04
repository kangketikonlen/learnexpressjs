'use strict';

const
	bcrypt = require('bcrypt'),
	services = require('../services/authService');

let refreshTokens = []

exports.loginRequest = async (req, res, next) => {
	try {
		let userData = await services.findUser(req.body.users_login);
		const passwordIsValid = bcrypt.compareSync(req.body.users_pass, userData[0].users_pass);
		if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
		const accessToken = generateAccessToken({ id: userData[0].users_id, level: userData[0].levels_id, nama: userData[0].users_name });
		const refreshToken = jwt.sign({ id: userData[0].users_id, level: userData[0].levels_id, nama: userData[0].users_name }, JWTsecret2)
		refreshTokens.push(refreshToken)
		res.json({ accessToken: accessToken, refreshToken: refreshToken })
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
}

exports.tokenRequest = async (req, res, next) => {
	const refreshToken = req.body.token
	if (refreshToken == null) return res.sendStatus(401)
	if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
	jwt.verify(refreshToken, JWTsecret2, (err, sessions) => {
		if (err) return res.sendStatus(403)
		const accessToken = generateAccessToken({ sessions })
		res.json({ accessToken: accessToken })
	})
}

exports.logoutRequest = async (req, res, next) => {
	refreshTokens = refreshTokens.filter(token => token !== req.body.token)
	res.sendStatus(204)
}

function generateAccessToken(data) {
	return jwt.sign(data, JWTsecret, { expiresIn: '1d' })
}