const Post = require('../models/post');
const Comment = require('../models/comment');

const create = async (req, res) => {
	//store the data sent in request into the database
	try {
		await Post.create({
			content : req.body.content,
			user    : req.user._id
		});
		return res.redirect('back');
	} catch (err) {
		console.log('Error', err);
		return;
	}
};

const destroy = async (req, res) => {
	try {
		let post = await Post.findById(req.params.id);
		//check if the user is authorized to delete the post
		if (post.user == req.user.id) {
			post.remove();
			await Comment.deleteMany({ post: req.params.id });
			return res.redirect('back');
		}
		else {
			return res.redirect('back');
		}
	} catch (err) {
		console.log('Error', err);
	}
};

module.exports = { create, destroy };
