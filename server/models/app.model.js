const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true
	},
	logo: String,
	name: {
		type: String,
		required: true
	},
	long_desc: String,
	short_desc: String,
	background: String,
}, { timestamps: true });

appSchema.methods.toJSON = function () {
	var obj = this.toObject();
	delete obj._id;
	delete obj.__v;
	obj.createdAt = new Date(obj.createdAt).toLocaleString();
	if (obj.updatedAt) obj.updatedAt = new Date(obj.updatedAt).toLocaleString();
	return obj;
}

appSchema.pre('save', async function (next) {
	this.updatedAt = null;
	next();
});

module.exports = mongoose.model('apps', appSchema)