const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');

/**
 * Whenever a username and password is received from the client,
 * we need to find that user in the database and generate a JWT 
 */
const createSession = async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });
		if (!user || user.password != req.body.password) {
			return res.json(422, {
				message : 'Invalid email or password'
			});
		}
		else {
			return res.json(200, {
				message : 'User logged in successfully',
				data    : {
					token : jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: '1h' })
				}
			});
		}
	} catch (err) {
		console.log('Error in creating session in Passport JWT', err);
		return res.json(500, {
			message : 'Internal Server Error'
		});
	}
};

module.exports = { createSession };
