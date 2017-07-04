const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {

	router.post('/newBlog', (req, res) => {
		res.send('TEST');
	})

	return router
}