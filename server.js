const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');

const PORT = 8080;

// setup provider for mongoose promises
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, { useMongoClient: true }, err => {
	if (err) {
		console.log(`Could not connect to mongodb: ${err}`)
	} else {
		console.log(`Connected to database: ${config.db}`);
	}
})

// setup folder for static content
app.use(express.static(__dirname + '/client/dist'));

// Routing
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/dist/index.html'));
})


// Listen on incomming requets
app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
})