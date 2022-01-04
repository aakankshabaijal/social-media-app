const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication when signing in using passport
passport.use(
	new LocalStrategy(
		{
			usernameField : 'email'
		},
		(email, password, done) => {
			//find a user and establish the identity
			User.findOne({ email: email }, (err, user) => {
				if (err) {
					console.log('Error in finding user --> Passport');
					return done(err);
				}
				if (!user || user.password != password) {
					console.log('Invalid Username/Password');
					return done(null, false);
				}
				return done(null, user);
			});
		}
	)
);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user, done) => {
	done(null, user.id); //encrypt the user id in the cookie
});

//deserializing the user from the key in the cookies
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		if (err) {
			console.log('Error in finding user --> Passport');
			return done(err);
		}
		return done(null, user);
	});
});

//check if the user is authenticated
passport.checkAuthentication = (req, res, next) => {
	if (req.isAuthenticated()) {
		//in built funtion of passport
		return next(); //if user is signed in then pass on the request to controller's action
	}
	else {
		return res.redirect('/users/sign-in');
	}
};

passport.setAuthenticatedUser = (req, res, next) => {
	if (req.isAuthenticated()) {
		//req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
		res.locals.user = req.user;
	}
	next();
};

module.exports = { passport };
