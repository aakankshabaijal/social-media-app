module.exports.home = (req, res) => {
	// return res.send('<h1>Express server is running for Instacode</h1>');

	res.render('home', {
		title : 'Instacode - Home'
	});
};
