var express = require('express');

// home page
exports.home = function(req, res) {
	res.render('index', {});
};

// about page
exports.about = function(req, res) {
	res.render('about', {});
};
