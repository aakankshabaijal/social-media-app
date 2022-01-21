const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');

const toggleLike = async (req, res) => {
	try {
		// likes/toggle/?id=abc&type=Post
		let likeable;
		let deleted = false;

		if (req.query.type === 'Post') {
			likeable = await Post.findById(req.query.id).populate('likes');
		}
		else if (req.query.type === 'Comment') {
			likeable = await Comment.findById(req.query.id).populate('likes');
		}
		else {
			throw new Error('Invalid type');
		}

		//check if like already exists

		let existingLike = await Like.findOne({
			likeable : req.query.id,
			onModel  : req.query.type,
			user     : req.user._id
		});

		//if like exists, delete it, else make a new like
		if (existingLike) {
			likeable.likes.pull(existingLike._id);
			likeable.save();
			existingLike.remove();
			deleted = true;
		}
		else {
			let newLike = await Like.create({
				user     : req.user._id,
				likeable : req.query.id,
				onModel  : req.query.type
			});

			likeable.likes.push(newLike._id);
			likeable.save();
		}

		return res.json(200, {
			message : 'Request Successful',
			data    : {
				deleted : deleted
			}
		});
	} catch (err) {
		console.log('Error in toggleLike: ', err);
		return res.json(500, {
			message : 'Internal Server Error'
		});
	}
};

module.exports = { toggleLike };
