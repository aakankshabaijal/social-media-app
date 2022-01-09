const Post = require('../models/post');
const Comment = require('../models/comment');

const create = async (req, res) => {
	//store the data sent in request into the database
	try {
		let post = await Post.create({
			content : req.body.content,
			user    : req.user._id
		});
		if (req.xhr) {
			return res.status(200).json({
				data    : {
					post : post
				},
				message : 'Post created successfully'
			});
		}

		req.flash('success', 'Post created successfully');
		return res.redirect('back');
	} catch (err) {
		req.flash('error', 'Error creating post');
		console.log('Error', err);
		return res.redirect('back');
	}
};

const destroy = async (req, res) => {
	try {
		let post = await Post.findById(req.params.id);
		//check if the user is authorized to delete the post
		if (post.user == req.user.id) {
			post.remove();
			await Comment.deleteMany({ post: req.params.id });

			if (req.xhr) {
				return res.status(200).json({
					data    : {
						post_id : req.params.id
					},
					message : 'Post deleted successfully'
				});
			}
			req.flash('success', 'Post deleted successfully');
			return res.redirect('back');
		}
		else {
			req.flash('error', 'You are not authorized to delete this post');
			return res.redirect('back');
		}
	} catch (err) {
		req.flash('error', 'Error deleting post');
		console.log('Error', err);
		return res.redirect('back');
	}
};

module.exports = { create, destroy };
