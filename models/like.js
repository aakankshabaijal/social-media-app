const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema(
	{
		user     : {
			type : mongoose.Schema.Types.ObjectId
		},
		//whether the like is on a post or a comment -> dynamic reference
		likeable : {
			type     : mongoose.Schema.Types.ObjectId,
			required : true,
			refPath  : 'onModel',
			enum     : [ 'Post', 'Comment' ]
		}
	},
	{
		timestamps : true
	}
);

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;
