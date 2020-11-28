require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const findDistance = require('./lib/findDistance');
const findClosest = require('./lib/findClosest');

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

// /USERS/ Routes

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
		} else {
			res.send("user already exists");
		}
	});
});

app.post('/users/login', (req, res) => {
	// getting email and password from request
	const { email, password } = req.body;

	// grabbing user from db
	User.findOne({ email: `${email}`, password: `${password}` }, 'email password', (err, user) => {
		if (err) throw err;

		res.send({ email: user.email, password: user.password })
	})
});

app.get('/users/getAllSellers', (req, res) => {
	// grabbing all users of type 1, which is the seller type
	User.find({ typeOfUser: 1 }, 'id email username firstName lastName address typeOfUser profession longitude latitude', (err, users) => {
		if (err) throw err;

		let sellers = []

		users.forEach((user) => {
			sellers.push({ id: user.id, email: user.email, username: user.username, firstName: user.firstName, lastName: user.lastName, address: user.address, typeOfUser: user.typeOfUser, profession: user.profession, longitude: user.longitude, latitude: user.latitude });
		})

		res.send(sellers);
	})
});

// /REVIEW/ Routes

app.post('/review/', (req, res) => {
	const { reviewValue, comment } = req.body;

	// creates Review in db with relationship to seller user
	Review.create({ seller: `${req.query.sellerId}`, reviewValue: `${reviewValue}`, comment: `${comment}` }, (err, review) => {
		if (err) throw err;
	});

	// sends response with score and comment
	res.send({ reviewValue: `${reviewValue}`, comment: `${comment}` });
})

app.get('/getSellerReviews/', (req, res) => {
	const sellerId = req.query.sellerId;

	// get all reviews matching the given seller id
	Review.find({ seller: `${sellerId}` }, 'reviewValue comment', (err, reviews) => {
		if (err) throw err;

		let sellerReviews = [];

		reviews.forEach((review) => {
			sellerReviews.push({ reviewValue: review.reviewValue, comment: review.comment });
		})

		res.send(sellerReviews);
	})
})

// getNearestSellers Routes

app.get('/getNearestSellers', (req, res) => {

	// gets all sellers but only returns their lat/long
	User.find({ typeOfUser: 1 }, 'longitude latitude', (err, users) => {
		if (err) throw err;

		let sellers = []

		users.forEach((user) => {
			sellers.push({ longitude: user.longitude, latitude: user.latitude });
		})

		const closestSeller = findClosest(sellers, req.query.longitude, req.query.latitude);
	})

	console.log(sellers);
})

app.listen(port, () => {
	console.log(`Server listening on port ${port}.`);
});
