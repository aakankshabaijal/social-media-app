const User = require('../models/user');

const profile = (req, res) => {
	//user can access the profile page only if they are signed in
	//if req.cookie contains the user_id then the user is signed in
	if (!req.cookies.user_id) {
		return res.redirect('/users/sign-in');
	}
	User.findById(req.cookies.user_id, (err, user) => {
		if (err) {
			console.log('error in finding user while accessing profile');
			return;
		}
		if (!user) {
			return res.redirect('/users/sign-in');
		}
		res.render('user_profile', {
			title : 'Instacode | Profile',
			user  : user
		});
	});
};

const signUp = (req, res) => {
	res.render('user_sign_up', {
		title : 'Instacode | Sign Up'
	});
};

const signIn = (req, res) => {
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
	/** STEPS TO AUTHENTICATE
	 * 
	 *  check if the user exists in the DB
	 * 	if user is found, check if password is correct
	 * 	if password is correct, create a session and store in cookies
	 * 	if password is incorrect, redirect to sign in page
	 * 	if user is not found, redirect to sign up page
	 */

	User.findOne({ email: req.body.email }, (err, user) => {
		if (err) {
			console.log('error in finding user while signing in');
			return;
		}
		if (!user) {
			return res.redirect('back');
		}
		if (user.password !== req.body.password) {
			return res.redirect('back');
		}
		res.cookie('user_id', user._id.toString());
		return res.redirect('/users/profile');
	});
};

const signOut = (req, res) => {
	res.clearCookie('user_id');
	res.redirect('/users/sign-in');
};

module.exports = { profile, signUp, signIn, create, createSession, signOut };