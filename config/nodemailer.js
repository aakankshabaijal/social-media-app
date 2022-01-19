const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
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
});

let renderTemplate = (data, relativePath) => {
	let mailHTML;
	ejs.renderFile(path.join(__dirname, '../views/mailers', relativePath), data, function(err, template) {
		if (err) {
			console.log('Error in rendering template', err);
			return;
		}
		else {
			mailHTML = template;
		}
	});
	return mailHTML;
};

module.exports = { transporter, renderTemplate };
