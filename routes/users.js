/**
 * Created by Leo on 14-11-5.
 */
var User = require('./../dao/User.js');

// 是否已经登录
exports.auth = function(req, res, next) {
	if (req.session.authenticated) {
		next();
	} else {
		res.redirect('/login');
	}
}

// 是否是管理员
exports.manage = function(req, res, next) {

}

exports.register = function(req, res) {



	var user = User.newInstance();
	user.email = req.body.email;
	user.username = req.body.username;
	user.password = req.body.password;
	user.save(function(err) {
		var result = {};
		if (err) {
			result.code = 0;
			result.message = "操作异常";
		} else {
			result.code = 1;
			result.message = "注册成功";
		}
		res.json(result);
	});
}