const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async (req, res) => {
	/**
	 * First adding the authors of each post, then the comments on each post and
	 * the author of each comment.
	 */
	try {
		let posts = await Post.find({}).populate('user').populate({
			path     : 'comments',
			populate : {
				path : 'user'
			}
		});

		let users = await User.find({});

		return res.render('home', {
			title     : 'Instacode | Home',
			posts     : posts,
			all_users : users
		});
	} catch (err) {
		console.log('Error', err);
		return;
	}
};
