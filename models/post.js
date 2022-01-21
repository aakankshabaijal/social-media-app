const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		content  : {
			type     : String,
			required : true
		},
		user     : {
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'User'
		},
		//array of ids of comments made on this post
		comments : [
			{
				type : mongoose.Schema.Types.ObjectId,
				ref  : 'Comment'
			}
		],
		likes    : [
			{
				type : mongoose.Schema.Types.ObjectId,
				ref  : 'Like'
			}
		]
	},
	{
		timestamps : true
	}
);

const Post = new mongoose.model('Post', postSchema);

module.exports = Post;
