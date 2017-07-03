const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');


// const lookupSchema = new Schema({
// 	type: String,
// 	code: String,
// 	destination: String,
// 	value: String,
// 	isActive: Boolean,
// 	validFrom: String,
// 	validThru: String,
// })

const userschema = new Schema({
	email: { type: String, required: true, unique: true, lowercase: true },
	username: { type: String, required: true, unique: true, lowercase: true },
	password: { type: String, required: true }
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
userschema.methods.comparePasswords = password => {
	return bcrypt.compareSync(password, this.password);
}


// module.exports = mongoose.model('Lookup', lookupSchema);
module.exports = mongoose.model('User', userschema);

