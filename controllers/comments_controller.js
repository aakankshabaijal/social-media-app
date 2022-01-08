const Comment = require('../models/comment');
const Post = require('../models/post');

const create = async (req, res) => {
	try {
		let post = await Post.findById(req.body.post);
		if (post) {
			let comment = await Comment.create({
				content : req.body.content,
				user    : req.user._id,
				post    : req.body.post
			});
			post.comments.push(comment);
			post.save();

			return res.redirect('/');
		}
		else {
			throw 'Post not found';
		}
	} catch (err) {
		console.log('Error', err);
		return;
	}
};

const destroy = async (req, res) => {
	try {
		let comment = await Comment.findById(req.params.id);
		if (comment) {
			if (comment.user == req.user.id) {
				let postId = comment.post;
				comment.remove();
				let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
				return res.redirect('back');
			}
			else {
				return res.redirect('back');
			}
		}
		else {
			throw 'Comment not found for deletion';
		}
	} catch (err) {
		console.log('Error', err);
		return;
	}
};

module.exports = { create, destroy };
