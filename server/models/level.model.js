const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
	name: String
}, { timestamps: true });

levelSchema.methods.toJSON = function () {
	var obj = this.toObject();
	delete obj.__v;
	obj.createdAt = new Date(obj.createdAt).toLocaleString();
	if (obj.updatedAt) obj.updatedAt = new Date(obj.updatedAt).toLocaleString();
	return obj;
}

levelSchema.pre('save', async function (next) {
	this.updatedAt = null;
	next();
});

module.exports = mongoose.model('levels', levelSchema)