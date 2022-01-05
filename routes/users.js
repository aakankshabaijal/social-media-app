const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile', passport.checkAuthentication, usersController.profile);
router.get('/sign-up', usersController.signUp);

//if the user is already signed in, then redirect to the profile page
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

router.post(
	'/create-session',
	passport.authenticate('local', { failureRedirect: '/users/sign-in' }),
	usersController.createSession
);

router.get('/sign-out', usersController.signOut);

module.exports = router;
