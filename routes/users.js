/**
 * Created by Leo on 14-11-5.
 */
var User = require('./../dao/User.js');

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
			result.code = "注册成功";
		}
		res.json(result);
	});
}