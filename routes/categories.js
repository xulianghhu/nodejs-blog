var express = require('express');
var mongoose = require('mongoose');
var Category = require('./../dao/Category.js');

exports.edit = function(req, res) {
	// create a new category
	if (req.params.id == 0) {
		res.render('category-edit', {category: Category.newInstance()});
	} 
	// update an exist one
	else {
		Category.findById(req.params.id, function(category) {
			res.render('category-edit', {category: category});
		});
	}
}

exports.save = function(req, res) {
	
	Category.findById(req.params.id, function(category) {
		if (category) {
			Category.updateById(req.params.id, {name: req.body.name, priority: req.body.priority});
		} else {
			var category = Category.newInstance();
			category.name = req.body.name;
			category.priority = req.body.priority;
			category.blogCount = 0;
			category.save();
		}
	});
	
	res.redirect('/admin/categories');
}

exports.remove = function(req, res) {
	Category.findById(req.params.id, function(category) {
		if (category) {
			category.remove();
			res.write('success');
		}
		res.end();
	});
}