var express = require('express');
var router = express.Router();

var Category = require('./../dao/Category.js');
var Blog = require('./../dao/Blog.js');

exports.admin = function(req, res) {
	res.render('admin', {});
}

exports.categories = function(req, res) {
	Category.findAll(function(categories) {
		res.render('admin-categories', {categories: categories});
	});
}

exports.blogs = function(req, res) {
	Blog.findAll(function(blogs) {
		res.render('admin-blogs', {blogs: blogs})
	});
}
