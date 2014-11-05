// home page
exports.home = function (req, res) {
	res.render('index', {});
};

// about page
exports.about = function (req, res) {
	res.render('about', {});
};

// login page
exports.login = function (req, res) {
	res.render('login');
}
