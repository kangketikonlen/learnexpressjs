const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: String,
	level: String,
	username: String,
	password: String
}, { timestamps: true });

module.exports = mongoose.model('users', UserSchema)