var express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

var app = express();

var index = require('./routes/index'),
	user = require('./routes/users'),
	blogs = require('./routes/blogs'),
	categories = require('./routes/categories'),
	admin = require('./routes/admin');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.set('env', 'production');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home); // 主页
app.get('/login', index.login); // 登录界面
app.get('/about', index.about); // 关于界面
app.get('/blogs', blogs.findBlogs);
app.get('/blogs/:id', blogs.findBlogById);
app.get('/blogs/:id/content', blogs.findBlogContentById);

app.post('/register', user.register);

app.post('/categories/:id', categories.save);
app.delete('/categories/:id', categories.remove);


app.post('/blogs/:id', blogs.save);
app.post('/blogs/:id/toggle', blogs.toggle);


app.get('/admin', admin.admin);
app.get('/admin/categories', admin.categories);
app.get('/admin/blogs', admin.blogs);
app.get('/admin/categories/:id/edit', categories.edit);
app.get('/admin/blogs/:id/edit', blogs.edit);
app.post('/admin/blogs/:id/sticky', blogs.sticky);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	res.render('404');
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: 'Error',
		error: {}
	});
});

// connect to the database
mongoose.connect('mongodb://localhost/blog');

module.exports = app;
