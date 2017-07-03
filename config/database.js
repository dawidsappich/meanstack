const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
	uri: 'mongodb://localhost/aj_proto',
	secret: crypto,
	db: 'aj_proto'
}