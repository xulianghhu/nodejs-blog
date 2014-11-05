/**
 * Created by Leo on 14-11-5.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: String,
	username: String,
	password: String,
	create_time: {type: Date, default: Date.now}
});

mongoose.model("user", UserSchema);
var User = mongoose.model('user');

exports.newInstance = function () {
	return new User();
}