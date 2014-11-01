var express = require('express');
var mongoose = require('mongoose');
var Blog = require('./../dao/Blog.js');
var Category = require('./../dao/Category.js');

exports.findBlogs = function(req, res) {
	var index = req.query.index || 1;
	var size = req.query.size || 5;
	var search = req.query.search;
	var category = req.query.category;
	
	var result = {};
	result.index = index;
	result.size = size;
	result.search = search ? search : '';
	result.selectedCategory = category ? category : '';
	
	var params = {};
	// search by keyword
	params.criteria = search ? { $or: [{title: new RegExp(search)}, {content: new RegExp(search)}]} : {};
	// search by category
	if (category) {
		// search blogs which have no category
		if (category === 'others')
			params.criteria.category = null;
		else
			params.criteria.category = category;
	}
	
	params.criteria.removed = false;
	params.projection = {};
	params.sort='-sticky -create_time';
	params.from = (index - 1) * size;
	params.limit = size;
	
	console.log(params);
	// blogs in current page
	Blog.find(params, function(blogs) {
		result.blogs = blogs;
		
		// blogs' count
		Blog.count(params.criteria, function(count) {
			result.pageCount = Math.ceil(count / size);
			console.log(result.pageCount);
			
			// popular blogs
			params.criteria = {removed: false};
			params.projection = {_id: 1, title: 1};
			params.sort='-count';
			params.from = 0;
			params.limit = 10;
			Blog.find(params, function(blogs) {
				result.popular = blogs;
				
				// categories
				Category.findAll(function(categories) {
					result.categories = categories;
					
					// total blogs' count
					Blog.count({removed: false}, function(count) {
						result.totalCount = count;
						// render html with data
						res.render('blog', result);
					});
					
				})
			});
		});
		
	});
}

exports.findBlogContentById = function(req, res) {
	var _id = req.params.id;
	Blog.findById(_id , function(blog) {
		if (blog) {
			res.write(blog.content);
			res.end();
		} 
	});
}

exports.findBlogById = function(req, res) {
	var _id = req.params.id;
	Blog.findById(_id , function(blog) {
		if (blog) {
			blog.count = blog.count + 1;
			res.render('blog-detail', {blog: blog});
			blog.save();
		} else {
			res.render('404');
		}
	});
}

exports.save = function(req, res) {

	Blog.findById(req.params.id, function(blog) {
		if (blog) {
			console.log(req.body);
			var blog = {title: req.body.title, content: req.body.content};
			if (req.body.category != '') {
				blog.category = req.body.category;
			}
			
			Blog.updateById(req.params.id, blog);
			res.redirect('/blogs/' + req.params.id);
		} else {
			var blog = Blog.newInstance();
			blog.title = req.body.title;
			blog.content = req.body.content;
			blog.removed = false;
			if (req.body.category != '') {
				blog.category = req.body.category;
				Category.incBlogCount(req.body.category);
			}
			blog.save();
			res.redirect('/blogs/' + blog._id);
		}
	});
	
}

exports.remove = function(req, res) {
	Blog.removeById(req.params.id, function(err) {
		if (!err) {
			res.write('success');
			Blog.findById(req.params.id, function(blog) {
				if (!err)
					Category.decBlogCount(blog.category);
			});
		}
		res.end();
	});
	

}

exports.edit = function(req, res) {
	console.log(req.query.id);
	Category.findAll(function(categories) {
		// create a new category
		if (req.params.id == 0) {
			res.render('blog-edit', {
				blog: Blog.newInstance(), 
				categories: categories
			});
		} 
		// update an exist one
		else {
			Blog.findById(req.params.id, function(blog) {
				console.log(blog)
				res.render('blog-edit', {
					blog: blog, 
					categories: categories
				});
			});
		}
	});
	
	
}

exports.sticky = function(req, res) {
	console.log(req.params.id);
	Blog.sticky(req.params.id, function(err) {
		if (!err)
			res.write('success');
		res.end();
	});
}



