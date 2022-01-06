const Post = require('../models/post');

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

module.exports = { create };
