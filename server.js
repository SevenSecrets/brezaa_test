require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./schema/user');
const Review = require('./schema/review');

const app = express();
const port = 3000;

//db connnect
mongoose.connect(`mongodb+srv://user:${process.env.MONGODB_PASS}@cluster0.mmpxe.mongodb.net/brezaa_test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
	if (err) throw err;

	console.log("db connection successful.")
});
const db = mongoose.connection;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routing
app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.post('/users/signup', (req, res) => {
	// creating user from request
	const { email, password, username, firstName, lastName, address, typeOfUser, profession, longitude, latitude } = req.body;
	
	// seeing if user already exists
	const userCheck = User.findOne({ username: `${username}` });

	// only saving into the db if user doesn't already exist
	userCheck.exec((err, user) => {
		if (err) throw err;

		if (user == null) {
			User.create({ email: `${email}`, password: `${password}`, username: `${username}`, firstName: `${firstName}`, lastName: `${lastName}`, address: `${address}`, typeOfUser: `${typeOfUser}`, profession: `${profession}`, longitude: `${longitude}`, latitude: `${latitude}` }, (err, newUser) => {
				if (err) throw err;
			})
			res.send({ email: `${email}`, password: `${password}`, username: `${username}`, firstName: `${firstName}`, lastName: `${lastName}`, address: `${address}`, typeOfUser: `${typeOfUser}`, profession: `${profession}`, longitude: `${longitude}`, latitude: `${latitude}` });
		}

		res.send("user already exists")
	});
});

app.post('/users/login', (req, res) => {

});

app.get('/users/getAllSellers', (req, res) => {

});

app.listen(port, () => {
	console.log(`Server listening on port ${port}.`);
});
