'use strict';
const conn = require('./dbConfig');

let localConfig = {
	hostname: "localhost",
	port: "3000",
	dataStore: conn.connDb,
	sessStore: conn.connSess,
	JWTsecret: "behindyou",
	JWTsecret2: "frontyou",
	oauth2Credentials: {
		client_id: "647145905977-o0e2gt55epiqe9llqrbpgsqt9uj4t48t.apps.googleusercontent.com",
		project_id: "Samples Web Client",
		auth_uri: "https://accounts.google.com/o/oauth2/auth",
		token_uri: "https://oauth2.googleapis.com/token",
		auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
		client_secret: "hgePg1_EcjDVqIMy-EiE7_yc",
		redirect_uris: [
			`http://${process.env.HOST}:${process.env.PORT}/login/auth_callback`
		],
		scopes: [
			'https://www.googleapis.com/auth/userinfo.profile'
		]
	}
};

module.exports = localConfig;