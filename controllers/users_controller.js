const profile = (req, res) => {
	// res.send('<h1>Profile page of User</h1>');
	res.render('users', {
		title     : 'Profile',
		firstName : 'Aakanksha',
		lastName  : 'Baijal'
	});
};

module.exports = { profile };
