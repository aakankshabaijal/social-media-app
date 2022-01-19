const nodemailer = require('../config/nodemailer');

const newComment = (comment) => {
	console.log('Inside comments mailer');

	let htmlString = nodemailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs');

	nodemailer.transporter.sendMail(
		{
			from    : 'aakankshabaijal16@gmail.com',
			to      : comment.user.email,
			subject : 'New comment published',
			html    : htmlString
		},
		(err, info) => {
			if (err) {
				console.log('Error in sending mail', err);
				return;
			}
			else {
				console.log('Message sent', info);
				return;
			}
		}
	);
};

module.exports = { newComment };
