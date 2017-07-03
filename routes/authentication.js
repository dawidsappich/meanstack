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
					console.log(err);
					res.json({ success: false, message: 'Could not save user. Error: ', err });
				} else {
					res.json({ success: true, message: 'User saved' });
				}
			})
				.then(() => console.log('User saved'))
				.catch(() => console.log('Error saving user'));

			// res.json({ success: true, message: 'request completed' });
		}
	})
	return router
}