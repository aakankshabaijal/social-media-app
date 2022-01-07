const Post = require('../models/post');
const Comment = require('../models/comment');

const create = (req, res) => {
	//store the data sent in request into the database
	Post.create(
		{
			content : req.body.content,
			user    : req.user._id
		},
		(err, post) => {
			if (err) {
				console.log('Error in creating a post');
				return;
			}
			return res.redirect('back');
		}
	);
};

const destroy = (req, res) => {
	Post.findById(req.params.id, (err, post) => {
		if (err) {
			console.log('Error in deleting a post');
			return;
		}
		if (!post) {
			console.log('Post not found for deletion');
			return;
		}
		//check if the user is authorized to delete the post
		if (post.user == req.user.id) {
			post.remove();
			Comment.deleteMany({ post: req.params.id }, (err) => {
				if (err) {
					console.log('Error in deleting comments while deleting a post');
					return;
				}
				return res.redirect('/');
			});
		}
		else {
			return res.redirect('back');
		}
	});
};

module.exports = { create, destroy };
