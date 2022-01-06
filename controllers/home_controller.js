const Post = require('../models/post');

module.exports.home = (req, res) => {
	// return res.send('<h1>Express server is running for Instacode</h1>');
	// console.log(req.cookies);
	// res.cookie('user_id', '123456');
	Post.find({}).populate('user').exec((err, posts) => {
		if (err) {
			console.log('Error in fetching posts from db');
			return;
		}
		return res.render('home', {
			title : 'Instacode | Home',
			posts : posts
		});
	});
};
