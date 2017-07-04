const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {

	router.post('/newBlog', (req, res) => {
		if (!req.body.title) {
			res.json({ success: false, message: 'No blog title provided' });
		} else if (!req.body.body) {
			res.json({ success: false, message: 'No blog body provided' });
		} else if (!req.body.createdBy) {
			res.json({ success: false, message: 'No ceratedBy provided' });
		} else {
			const blog = new Blog({
				title: req.body.title,
				body: req.body.body,
				createdBy: req.body.createdBy
			});

			// save blog in database
			blog.save((err) => {
				if (err) {
					// gibt es fehler seitens der validierung
					if (err.errors) {
						// gibt es probleme mit dem title
						if (err.errors.title) {
							res.json({ success: false, message: 'No valid blog title provided' });
							// gibt es probleme mit dem text
						} else if (err.errors.body) {
							res.json({ success: false, message: 'No valid blog textbody provided' });
						} else if (err.errors.createdBy) {
							res.json({ success: false, message: 'No valid blog creator provided' });
						}
						// es ist ein allgemeiner Fehler
					} else {
						res.json({ success: false, message: err });
					}
				} else {
					// bogpost wurde gespeichert
					res.json({ success: true, message: 'Blog is saved' });
				}
			})


		}
	})

	return router
}