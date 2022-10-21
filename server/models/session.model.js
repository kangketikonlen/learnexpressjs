const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
	username: String,
	accessToken: String,
	refreshToken: String
}, { timestamps: true });

module.exports = mongoose.model('sessions', sessionSchema)