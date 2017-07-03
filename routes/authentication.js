const User = require('../models/user');

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
					res.json({ success: true, message: 'User saved' })
				}
			})
				.then(() => console.log('User saved'))
				.catch(() => console.log('Error saving user'));

			// res.json({ success: true, message: 'request completed' });
		}
	})
	return router
}