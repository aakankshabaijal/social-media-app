const userPost = (req, res) => {
	//res.send('<h1>Here are the posts</h1>');
	res.render('posts', {
		title    : 'Feed',
		userName : 'aakanksha_baijal',
		likes    : '10',
		comments : '5'
	});
};

module.exports = { userPost };
