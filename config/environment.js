const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
	interval : '1d',
	path     : logDirectory
});

const development = {
	name                 : 'development',
	asset_path           : './public/',
	session_cookie_key   : 'blahsomething',
	db_name              : 'instacode_development',
	smtp                 : {
		service : 'gmail',
		host    : 'smtp.gmail.com',
		port    : 587,
		secure  : false,
		auth    : {
			//this is the email account from which the mail will be send
			//write the email address and password of that email account
			user : 'f20190304@goa.bits-pilani.ac.in',
			pass : ''
		}
	},
	google_client_ID     : '632319251961-tcbllehofu2m7cfoukqkqstoi8vi0tb4.apps.googleusercontent.com',
	google_client_secret : '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',
	google_callback_URL  : 'http://localhost:8000/users/auth/google/callback',
	jwt_secret           : 'instacode',
	morgan               : {
		mode    : 'development',
		options : { stream: accessLogStream }
	}
};

const production = {
	name                 : 'production',
	asset_path           : process.env.INSTACODE_ASSET_PATH,
	session_cookie_key   : process.env.INSTACODE_SESSION_COOKIE_KEY,
	db_name              : process.env.INSTACODE_DB,
	smtp                 : {
		service : 'gmail',
		host    : 'smtp.gmail.com',
		port    : 587,
		secure  : false,
		auth    : {
			//this is the email account from which the mail will be send
			//write the email address and password of that email account
			user : process.env.INSTACODE_GMAIL_USERNAME,
			pass : process.env.INSTACODE_GMAIL_PASSWORD
		}
	},
	google_client_ID     : process.env.GOOGLE_CLIENT_ID,
	google_client_secret : process.env.GOOGLE_CLIENT_SECRET,
	google_callback_URL  : process.env.GOOGLE_CALLBACK_URL,
	jwt_secret           : process.env.INSTACODE_JWT_SECRET,
	morgan               : {
		mode    : 'combined',
		options : { stream: accessLogStream }
	}
};

module.exports = eval(process.env.INSTACODE_ENVIRONMENT) ? eval(process.env.INSTACODE_ENVIRONMENT) : development;
