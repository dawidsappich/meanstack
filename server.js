const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const bodyparser = require('body-parser');
const auth = require('./routes/authentication')(router);

const PORT = 8080;

// Use native promises
mongoose.Promise = global.Promise;
// connect to mongodb
mongoose.connect(config.uri, /*{ useMongoClient: true },*/ err => {
	if (err) {
		console.log(`Could not connect to mongodb: ${err}`)
	} else {
		console.log(`Connected to database: ${config.db}`);
	}
})

// middleware for parsing incoming requests
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
// setup folder for static content
app.use(express.static(__dirname + '/client/dist/'));

app.use('/authentication', auth);

// Routing
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/dist/index.html'));
})


// Listen on incomming requets
app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
})