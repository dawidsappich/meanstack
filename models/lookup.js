const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lookupSchema = new Schema({
	type: String,
	code: String,
	destination: String,
	value: String,
	isActive: Boolean,
	validFrom: String,
	validThru: String,
})

module.exports = mongoose.model('Lookup', lookupSchema);