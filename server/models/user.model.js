const mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	salt = bcrypt.genSaltSync(10);

const UserSchema = new mongoose.Schema({
	name: String,
	level: String,
	username: String,
	password: String
}, { timestamps: true });

UserSchema.methods.toJSON = function () {
	var obj = this.toObject();
	delete obj.password;
	delete obj.__v;
	obj.createdAt = new Date(obj.createdAt).toLocaleString();
	if (obj.updatedAt) obj.updatedAt = new Date(obj.updatedAt).toLocaleString();
	return obj;
}

UserSchema.pre('save', async function (next) {
	this.updatedAt = null;
	if (!this.isModified('password')) return next();
	this.password = bcrypt.hashSync(this.password, salt);
	next();
});

module.exports = mongoose.model('users', UserSchema)