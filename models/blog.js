const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// utility methods
let titleLengthChecker = (title) => {
	if (!title) {
		return false;
	} else if (title.length < 5 || title.length > 50) {
		return false;
	} else {
		return true;
	}
}
let blogBodyLengthChecker = (body) => {
	if (!body) {
		return false;
	} else if (body.length < 5 || body.length > 500) {
		return false;
	} else {
		return true;
	}
}

let commentLengthChecker = (comment) => {
	if (!comment[0]) {
		return false;
	} else if (comment[0].length < 5 || comment[0].length > 500) {
		return false;
	} else {
		return true;
	}
}


let alphaNumericTitleChecker = (title) => {
	if (!title) {
		return false;
	} else {
		const regex = new RegExp(/^[a-zA-Z0-9 ]+$/);
		return regex.test(title);
	}
}


// Validators
const titleValidators = [
	{ validator: titleLengthChecker, message: 'Title must be at least 5 characters but no more than 50' },
	{ validator: alphaNumericTitleChecker, message: 'Title must be alphanumeric' }
]
const blogBodyValidators = [
	{ validator: blogBodyLengthChecker, message: 'Text must be at least 5 characters but no more than 500' }
]
const commentValidators = [
	{ validator: commentLengthChecker, message: 'Comment must be at least 5 characters but no more than 500' }
]


// schema
const blogSchema = new Schema({
	title: { type: String, required: true, validator: titleValidators },
	body: { type: String, required: true, validator: blogBodyValidators },
	createdBy: { type: String },
	createdAt: { type: Date, default: Date.now() },
	likes: { type: Number, default: 0 },
	dislikes: { type: Number, default: 0 },
	likedBy: { type: Array },
	dislikedBy: { type: Array },
	comments: [
		{
			comment: { type: String, validator: commentValidators },
			commentBy: { type: String }

		}
	]
})


module.exports = mongoose.model('Blog', blogSchema);

