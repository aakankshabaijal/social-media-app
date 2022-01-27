const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const env = require('./environment');

const User = require('../models/user');

// prettier-ignore
passport.use(
	new googleStrategy(
		{
			clientID: env.google_client_ID,
            clientSecret: env.google_client_secret,
            callbackURL: env.google_callback_URL,
		},
		function(accessToken, refreshToken, profile, done) {
			User.findOne({
                email: profile.emails[0].value
            }).exec(function(err, user) {
                if (err) {
                    console.log('Error in google strategy-passport', err);
                    return done(err);
                }
                if (!user) {
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    }, (err, user) => {
                        if(err){
                            console.log('Error in creating user google strategy-passport', err);
                            return done(err);
                        }else{
                            return done(null, user);
                        }
                    });
                    // user.save(function(err, user) {
                    //     if (err) {
                    //         console.log(err);
                    //     }
                    //     return done(err, user);
                    // });
                } else {
                    return done(null, user);
                }
            });
		}
	)
);

module.exports = passport;
