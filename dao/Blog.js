var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
	title:			String,
	content:		String,
	create_time:	{type: Date, default: Date.now},
	update_time:	{type: Date, default: Date.now},
	category:		{type: Schema.ObjectId, ref : 'Category'},
	count:			{type: Number, default: 0},
	sticky:			{type: Number, default: 0},
	removed:		{type: Boolean, default: false}
});

mongoose.model("blog", BlogSchema)
var Blog = mongoose.model('blog');

// find all blogs
exports.findAll = function(callback) {
	Blog.find({removed: false})
		.sort('-sticky -create_time')
		.exec(function(err, blogs) {
			callback(err ? {} : blogs);
		});
}

// find blogs
exports.find = function(params, callback) {
	var criteria = params.criteria;
	var projection = params.projects;
	var sort = params.sort;
	var from = params.from;
	var limit = params.limit;
	Blog.find(criteria, projection)
		.sort(sort)
		.skip(from)
		.limit(limit)
		.exec(function(err, blogs) {
			callback(err ? {} : blogs);
		});
}

// find blogs' count
exports.count = function(criteria, callback) {
	Blog.count(criteria, function(err, count) {
		callback(err ? 0 : count);
	});
}

// find blog by _id
exports.findById = function(_id, callback) {
	Blog.findOne({_id: _id}, function(err, blog) {
		callback(err ? undefined : blog);
    });
}

// save or update a blog
exports.saveOrUpdate = function(blog) {
	Blog.findByIdAndUpdate(blog._id, blog, {upsert: true}, function(err) {
		console.log(err);
	});
}

exports.updateById = function(_id, blog) {
	Blog.update({_id: _id}, blog, function(err) {
		console.log(err);
	});
}

exports.removeById = function(_id, callback) {
	Blog.update({_id: _id}, {removed: true}, function(err) {
		callback(err);
	});
}

exports.sticky = function(_id, callback) {
	Blog.findOne({_id: _id}, function(err, blog) {
		if (err) {
			console.log(err);
		} else if (blog.sticky != undefined){
			var sticky = blog.sticky + 1;
			Blog.update({_id: _id}, {sticky: sticky}, function(err) {
				callback(err);
			});
		}
    });
}

exports.newInstance = function() {
	return new Blog();
}

