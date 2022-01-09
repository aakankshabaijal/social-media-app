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
			req.flash('success', 'Comment added successfully');
			return res.redirect('/');
		}
		else {
			throw 'Post not found';
		}
	} catch (err) {
		req.flash('error', 'Error adding comment');
		console.log('Error', err);
		return res.redirect('back');
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
				req.flash('success', 'Comment deleted successfully');
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
		req.flash('error', 'Error deleting comment');
		console.log('Error', err);
		return res.redirect('back');
	}
};

module.exports = { create, destroy };
