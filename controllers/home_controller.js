const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async (req, res) => {
	/**
	 * First adding the authors of each post, then the comments on each post and
	 * the author of each comment.
	 * The most recent posts are shown first
	 */
	try {
		let posts = await Post.find({})
			.sort('-createdAt')
			.populate('user')
			.populate({
				path     : 'comments',
				populate : [
					{
						path : 'user'
					},
					{
						path : 'likes'
					}
				]
			})
			.populate({
				path     : 'likes',
				populate : {
					path : 'user'
				}
			});

		let users = await User.find({});

		return res.render('home', {
			title     : 'Instaclip | Home',
			posts     : posts,
			all_users : users
		});
	} catch (err) {
		console.log('Error', err);
		return;
	}
};

module.exports.credits = (req, res) => {
	return res.render('credits', {
		title : 'Instaclip | Credits'
	});
};
