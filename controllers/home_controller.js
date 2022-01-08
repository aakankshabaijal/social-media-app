const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = (req, res) => {
	/**
	 * First adding the authors of each post, then the comments on each post and
	 * the author of each comment.
	 */
	Post.find({})
		.populate('user')
		.populate({
			path     : 'comments',
			populate : {
				path : 'user'
			}
		})
		.exec((err, posts) => {
			if (err) {
				console.log('Error in fetching posts from db');
				return;
			}
			User.find({}, (err, users) => {
				return res.render('home', {
					title     : 'Instacode | Home',
					posts     : posts,
					all_users : users
				});
			});
		});
};
