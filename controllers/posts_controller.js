const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

const create = async (req, res) => {
	//store the data sent in request into the database
	try {
		let post = await Post.create({
			content : req.body.content,
			user    : req.user._id
		});
		if (req.xhr) {
			// if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
			post = await post.populate('user');
			return res.status(200).json({
				data    : {
					post : post
				},
				message : 'Post created successfully'
			});
		}
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

		if (post.user == req.user.id) {
			post.remove();

			//also have to delete all likes on all comments of that post
			//loop through all comments and delete all likes on each comment
			for (let comment of post.comments) {
				await Like.deleteMany({ likeable: comment._id });
			}

			await Comment.deleteMany({ post: req.params.id });
			await Like.deleteMany({ likeable: req.params.id });

			if (req.xhr) {
				return res.status(200).json({
					data    : {
						post_id : req.params.id
					},
					message : 'Post deleted'
				});
			}
			return res.redirect('back');
		}
		else {
			req.flash('error', 'You cannot delete this post!');
			return res.redirect('back');
		}
	} catch (err) {
		req.flash('error', err);
		return res.redirect('back');
	}
};

module.exports = { create, destroy };
