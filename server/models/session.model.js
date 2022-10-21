const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
	username: String,
	accessToken: String,
	refreshToken: String
}, { timestamps: true });

sessionSchema.pre('save', async function (next) {
	this.updatedAt = null;
	next();
});

module.exports = mongoose.model('sessions', sessionSchema)