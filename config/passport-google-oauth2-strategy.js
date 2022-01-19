const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

// prettier-ignore
passport.use(
	new googleStrategy(
		{
			clientID     : "632319251961-tcbllehofu2m7cfoukqkqstoi8vi0tb4.apps.googleusercontent.com",
			clientSecret : "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",
			callbackURL  : 'http://localhost:8000/users/auth/google/callback'
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
