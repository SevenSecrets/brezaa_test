const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// routing
app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.post('/users/signup', (req, res) => {
	const { email, password, username, firstName, lastName, address, typeOfUser, profession, longitude, latitude } = req.body;
});

app.post('/users/login', (req, res) => {

});

app.get('/users/getAllSellers', (req, res) => {

});

app.listen(port, () => {
	console.log(`Server listening on port ${port}.`);
});
