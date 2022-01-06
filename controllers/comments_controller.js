const Comment = require('../models/comment');
const Post = require('../models/post');

const create = (req, res) => {
	Post.findById(req.body.post, (err, post) => {
		if (err) {
			console.log('Error in adding comment id to corresponding post');
			return;
		}
		else if (!post) {
			console.log('Error in finding post to which comment must be added');
			return;
		}
		Comment.create(
			{
				content : req.body.content,
				user    : req.user._id,
				post    : req.body.post
			},
			(err, comment) => {
				if (err) {
					console.log('Error in creating a comment');
					return;
				}
				post.comments.push(comment);
				post.save();
			}
		);
		return res.redirect('/');
	});
};

module.exports = { create };
