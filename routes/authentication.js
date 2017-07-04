const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {
	// do something
	router.post('/register', (req, res) => {
		// req.body.username
		// req.body.password
		// req.body.email
		if (!req.body.email) {
			res.json({ success: false, message: 'email is not provided' });
		} else if (!req.body.username) {
			res.json({ success: false, message: 'username is not provided' });
		} else if (!req.body.password) {
			res.json({ success: false, message: 'password is not provided' });
		} else {
			let user = new User({
				email: req.body.email.toLowerCase(),
				username: req.body.username.toLowerCase(),
				password: req.body.password
			});
			// save returns a promise
			user.save((err, entry) => {
				if (err) {
					if (err.code === 11000) {
						res.json({ success: false, message: 'username or email already exists' });
						// validation errors are in err.errors object
					} else if (err.errors) {
						// invalid email
						if (err.errors.email) {
							res.json({ success: false, message: err.errors.email.message });
							// incvalid username
						} else if (err.errors.username) {
							res.json({ success: false, message: err.errors.username.message });
							// invlaid password
						} else if (err.errors.password) {
							res.json({ success: false, message: err.errors.password.message });
						} else {
							res.json({ success: false, message: err });
						}
					} else {
						res.json({ success: false, message: err });
					}
				} else {
					res.json({ success: true, message: 'Account registered' })
				}
			})
				.then(() => console.log('Account registered'))
				.catch(() => console.log('Error registering account'));

		}
	})

	router.get('/checkEmail/:email', (req, res) => {
		// if no email
		if (!req.params.email) {
			res.json({ success: false, message: 'Email ist not provided' });
		} else {
			// search for email in collection users
			User.findOne({ email: req.params.email }, (err, doc) => {
				if (err) {
					res.json({ success: false, message: err });
				} else {
					// found a document in collection users
					if (doc) {
						res.json({ success: false, message: 'Email is already taken' });
					} else {
						res.json({ success: true, message: 'Email is available' });
					}
				}
			})
		}
	});


	router.get('/checkUsername/:username', (req, res) => {
		// if no email
		if (!req.params.username) {
			res.json({ success: false, message: 'Username ist not provided' });
		} else {
			// search for email in collection users
			User.findOne({ username: req.params.username }, (err, doc) => {
				if (err) {
					res.json({ success: false, message: err });
				} else {
					// found a document in collection users
					if (doc) {
						res.json({ success: false, message: 'Username is already taken' });
					} else {
						res.json({ success: true, message: 'Username is available' });
					}
				}
			})
		}
	});

	// Login
	router.post('/login', (req, res) => {
		if (!req.body.username) {
			res.json({ success: false, message: 'No username provided' });
		} else if (!req.body.password) {
			res.json({ success: false, message: 'No password provided' });
		} else {
			// search user in DB
			User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
				if (err) {
					res.json({ success: false, message: 'Username not found' });
					res.json({ success: false, message: err });
				} else {
					if (!user) {
						res.json({ success: false, message: 'Username not found' });
					} else {
						// compare password wirh entry in db
						const validPassword = user.comparePasswords(req.body.password);
						if (!validPassword) {
							res.json({ success: false, message: 'Password does not match' });
						} else {
							// encrypt userid
							const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
							res.json({ success: true, message: 'Success', token: token, user: { username: user.username } });
						}
					}
				}
			})
		}
	});

	/**
	 * Middleware um den user-Token aus dem Header zu extrahieren
	 * Alle nachfolgenden router-Definitionen benötigen diesen user-Token
	 * als Zeichen dafür das der User authentifiziert und authorisiert ist
	 * Ist der token gültig wird er in req.decoded gespeichert und ist allen
	 * nachfolgenden Routerdefinitionen verfügbar
	 */
	// router.use((req, res, next) => {
	// 	const token = req.headers['authorisation'];
	// 	if (!token) {
	// 		res.json({ success: false, message: 'No token provided' });
	// 	} else {
	// 		// verifizieren des token mit Hilfe von config.secret
	// 		// mit config.secret wurde das token ursprüglich erstellt
	// 		jwt.verify(token, config.secret, (err, decoded) => {
	// 			if (err) {
	// 				res.json({ success: false, message: 'Token is invalid. Error: ' + err });
	// 			} else {
	// 				req.decoded = decoded;
	// 				// die verarbeitung an die nächte stufe weitergeben
	// 				next();
	// 			}
	// 		})
	// 	}
	// })

	// profile
	router.get('/profile', (req, res) => {

		// find username and password
		User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
			if (err) {
				res.json({ success: true, message: err });
			} else {
				if (!user) {
					res.json({ success: false, message: 'User not found' });
				} else {
					res.json({ success: true, user: user });
				}
			}
		})

	})

	return router
}