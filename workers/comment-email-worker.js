const queue = require('../config/kue');
const commentsMailer = require('../mailers/comments_mailer');

queue.process('emails', (job, done) => {
	commentsMailer.newComment(job.data);
	done();
});
