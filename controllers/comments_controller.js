const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment-email-worker');
const Like = require('../models/like');

module.exports.create = async function(req, res) {
	try {
		let post = await Post.findById(req.body.post);

		if (post) {
			let comment = await Comment.create({
				content : req.body.content,
				post    : req.body.post,
				user    : req.user._id
			});

			post.comments.unshift(comment); //pushes comments to the front of array
			post.save();
			comment = await comment.populate('user');
			// commentsMailer.newComment(comment);

			//*below code is for sending the email to the user who commented on the post
			// let job = queue.create('emails', comment).save((err) => {
			// 	if (err) {
			// 		console.log(err);
			// 		return;
			// 	}
			// 	else {
			// 		console.log('job created', job.id);
			// 	}
			// });

			if (req.xhr) {
				// Similar for comments to fetch the user's id!

				return res.status(200).json({
					data    : {
						comment : comment
					},
					message : 'Comment created!'
				});
			}

			req.flash('success', 'Comment published!');

			res.redirect('/');
		}
	} catch (err) {
		req.flash('error', err);
		return;
	}
};

module.exports.destroy = async function(req, res) {
	try {
		let comment = await Comment.findById(req.params.id);
		let postId = comment.post;
		let parentPost = await Post.findById(postId);

		//if the comment is made by the logged in user or
		// on a post made by the logged in user, then delete the comment
		if (parentPost.user == req.user.id || comment.user == req.user.id) {
			//we also need to delete all the likes on that comment
			await Like.deleteMany({ likeable: comment._id });
			comment.remove();

			let post = Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

			// send the comment id which was deleted back to the views
			if (req.xhr) {
				return res.status(200).json({
					data    : {
						comment_id : req.params.id
					},
					message : 'Comment deleted'
				});
			}

			req.flash('success', 'Comment deleted!');

			return res.redirect('back');
		}
		else {
			req.flash('error', 'Unauthorized');
			return res.redirect('back');
		}
	} catch (err) {
		req.flash('error', err);
		return;
	}
};
