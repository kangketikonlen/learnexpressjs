const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	accessToken: {
		type: String,
		required: true
	},
	refreshToken: {
		type: String,
		required: true
	}
}, { timestamps: true });

sessionSchema.pre('save', async function (next) {
	this.updatedAt = null;
	next();
});

module.exports = mongoose.model('sessions', sessionSchema)