const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
}, { timestamps: true });

levelSchema.methods.toJSON = function () {
	var obj = this.toObject();
	delete obj._id;
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