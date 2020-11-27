const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	email: String,
	password: String,
	username: String,
	firstName: String,
	lastName: String,
	address: String,
	typeOfUser: Number,
	profession: String,
	longitude: Number,
	latitude: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;