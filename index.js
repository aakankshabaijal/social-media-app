const express = require('express');
const app = express();
const port = 8000; //port 80 is for production/deployment
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session'); //used for session cookie
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo'); //used for storing the session cookie in the db
const sass = require('node-sass');

/**
 * https://www.youtube.com/watch?v=pGcCWhl6ePQ
 * How to convert scss to css file using sass package instead of another middleware
 */

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./public')); //use static files
app.use(expressLayouts); //use layout for rendering views

//extract style and script from sub-pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//middleware that takes in our session cookie and encrypts it
app.use(
	session({
		name              : 'instacode',
		secret            : 'blahsomething', //change the secret before deployment
		saveUninitialized : true,
		resave            : false,
		cookie            : {
			maxAge : 1000 * 60 * 100 //in milliseconds
		},
		store             : MongoStore.create({
			mongoUrl : 'mongodb://localhost/instacode'
		})
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//for using express router
app.use('/', require('./routes/index'));

app.listen(port, (err) => {
	if (err) {
		console.log(`Error in running the server : ${err}`);
	}
	else {
		console.log(`Server is running on port ${port}`);
	}
});
