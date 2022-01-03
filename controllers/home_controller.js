module.exports.home = (req, res) => {
	// return res.send('<h1>Express server is running for Instacode</h1>');
	console.log(req.cookies);
	res.cookie('user_id', '123456');
	res.render('home', {
		title : 'Instacode - Home'
	});
};
