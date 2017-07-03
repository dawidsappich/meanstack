const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');


// utility methods
let emailLengthChecker = (email) => {
	if (!email) {
		return false;
	} else if (email.length < 5 || email.length > 50) {
		return false;
	} else {
		return true;
	}
}
let usernameLengthChecker = (username) => {
	if (!username) {
		return false;
	} else if (username.length < 3 || username.length > 20) {
		return false;
	} else {
		return true;
	}
}
let passwordLengthChecker = (password) => {
	if (!password) {
		return false;
	} else if (password.length < 8 || password.length > 20) {
		return false;
	} else {
		return true;
	}
}

let validEmailChecker = (email) => {
	if (!email) {
		return false;
	} else {
		const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		return regex.test(email);
	}
}
let validUsernameChecker = (username) => {
	if (!username) {
		return false;
	} else {
		const regex = new RegExp(/^[a-zA-Z0-9]+$/);
		return regex.test(username);
	}
}
let validPasswordChecker = (password) => {
	if (!password) {
		return false;
	} else {
		const regex = new RegExp(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/);
		return regex.test(password);
	}
}

// Validators
const emailValidators = [
	{ validator: emailLengthChecker, message: 'Email must be at least 5 characters but no more than 50' },
	{ validator: validEmailChecker, message: 'Email ist not a valid' }
]
const usernameValidators = [
	{ validator: usernameLengthChecker, message: 'Username must be at least 3 characters but no more than 20' },
	{ validator: validUsernameChecker, message: 'Username ist not a valid' }
]
const passwordValidators = [
	{ validator: passwordLengthChecker, message: 'Password must be at least 8 characters but no more than 20' },
	{ validator: validPasswordChecker, message: 'Password ist not a valid' }
]

// schema
const userschema = new Schema({
	email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
	username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
	password: { type: String, required: true, validate: passwordValidators }
})

/**
 * Middleware to encrypt password
 * it is invoekd everytime before saving the document (user)
 * to mongodb
 */
userschema.pre('save', function (next) {
	// if document is not modified then return
	if (!this.isModified('password')) {
		return next();
	} else {
		// encrypt password
		bcrypt.hash(this.password, null, null, (err, hash) => {
			if (err) return next(err);
			this.password = hash;
			next();
		})
	}
})




/**
 * decrypt password
 */
userschema.methods.comparePasswords = function (password) {
	return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('User', userschema);

