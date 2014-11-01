var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CatetorySchema = new Schema({
	name:			String,
	create_time:	{type: Date, default: Date.now},
	priority:		{type: Number, default: 0},
	blogCount:		{type: Number, default: 0}
});

mongoose.model("category", CatetorySchema)
var Category = mongoose.model('category');

// final all categories
exports.findAll = function(callback) {
	Category.find()
		.sort('-priority')
		.exec(function(err, categories) {
			callback(err ? {} : categories);
		});
}

exports.findById = function(_id, callback) {
	Category.findOne({_id: _id}, function(err, category) {
		callback(err ? undefined : category);
    });
}

exports.updateById = function(_id, category) {
	Category.update({_id: _id}, category, function(err) {
		console.log(err);
	});
}

exports.saveOrUpdate = function(category) {
	Category.findByIdAndUpdate(category._id, category, {upsert: true}, function(err) {
		console.log(err);
	});
}

exports.incBlogCount = function(_id) {
	Category.findOne({_id: _id}, function(err, category) {
		if (err) {
			console.log(err);
		} else {
			var blogCount = category.blogCount + 1;
			Category.update({_id: _id}, {blogCount: blogCount}, function(err) {
				console.log(err);
			});
		}
    });
}

exports.decBlogCount = function(_id) {
	Category.findOne({_id: _id}, function(err, category) {
		if (err) {
			console.log(err);
		} else if (category && category.blogCount) {
			var blogCount = category.blogCount - 1;
			Category.update({_id: _id}, {blogCount: blogCount}, function(err) {
				console.log(err);
			});
		}
    });
}

exports.newInstance = function() {
	return new Category();
}

