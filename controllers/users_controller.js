const User = require('../models/user');

const profile = (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if (err) {
			console.log('Error in finding user in profile');
			return;
		}
		if (!user) {
			console.log('User profile not found');
			return;
		}
		return res.render('user_profile', {
			title        : 'Profile',
			profile_user : user
		});
	});
};

const update = (req, res) => {
	if (req.user.id == req.params.id) {
		User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
			if (err) {
				console.log('Error in updating user');
				return;
			}
			return res.redirect('back');
		});
	}
	else {
		return res.status(401).send('Unauthorized');
	}
};

const signUp = (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect('/users/profile');
	}

	res.render('user_sign_up', {
		title : 'Instacode | Sign Up'
	});
};

const signIn = (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect('/users/profile');
	}
	res.render('user_sign_in', {
		title : 'Instacode | Sign In'
	});
};

//get the sign up data

const create = (req, res) => {
	if (req.body.password !== req.body.confirm_password) {
		return res.redirect('back');
	}
	User.findOne({ email: req.body.email }, (err, user) => {
		if (err) {
			console.log('error in finding user in signing up');
			return;
		}
		if (!user) {
			//req.body contains the name, email and password, as defined in the schema.
			//The schema does not contain confirm_password and
			//hence the confirm_password field will not be saved in our DB.
			User.create(req.body, (err, user) => {
				if (err) {
					console.log('error in creating user while signing up');
					return;
				}
				return res.redirect('/users/sign-in');
			});
		}
		else {
			return res.redirect('back');
		}
	});
};

const createSession = (req, res) => {
	req.flash('success', 'Logged in successfully');
	return res.redirect('/');
};

const signOut = (req, res) => {
	req.logout(); //inbuilt using passport
	req.flash('success', 'You have logged out');
	return res.redirect('/');
};

module.exports = { profile, update, signUp, signIn, create, createSession, signOut };
