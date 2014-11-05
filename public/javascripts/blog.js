$(function () {

	var url = window.location.href;
	var arr = url.split("//");
	var path = arr[1].substring(arr[1].indexOf("/"));
	if (path.indexOf('/blogs') == 0) {
		$('#blog').addClass('active');
	} else if (path.indexOf('/about') == 0) {
		$('#about').addClass('active');
	} else if (path.indexOf('/admin') == 0) {
		$('#admin').addClass('active');
	}

	var ajax = new Ajax();

	// 删除类别
	$('.removeCategory').click(function () {

		var that = $(this);
		var id = that.attr('_id');

		ajax.delete('/categories/' + id, function (result) {
			if (result.code == 1) {
				that.parent().parent().parent().remove();
			} else {
				alert('operation failed');
			}
		});
	});

	// 删除或者还原博客
	$('.toggleBlog').click(function () {
		var that = $(this);
		var id = that.attr('_id');
		var removed = that.attr('removed');

		ajax.post('/blogs/' + id + '/toggle', {removed: removed}, function (result) {
			if (result.code == 1) {
				location.reload();
			} else {
				alert('operation failed');
			}
		});
	});

	// 置顶博客
	$('.stickBlog').click(function () {
		var that = $(this);
		var id = that.attr('_id');

		ajax.post('/admin/blogs/' + id + '/sticky', {}, function (result) {
			if (result.code == 1) {
				location.reload();
			} else {
				alert('operation failed');
			}
		});
	});

	// 点击类别下拉框
	$('#categoryList li').click(function () {
		$('#categoryName').val($(this).text());
		$('#categoryId').val($(this).attr('_id'));
	});

});

