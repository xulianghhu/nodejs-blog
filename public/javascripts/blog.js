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

	// 删除类别
	$('.removeCategory').click(function () {

		var that = $(this);
		var id = that.attr('_id');

		$.ajax({
			url: '/categories/' + id,
			type: 'DELETE',
			success: function (result) {
				if (result == 'success') {
					that.parent().parent().parent().remove();
				} else {
					alert('删除失败');
				}
			}
		});
	});

	// 删除或者还原博客
	$('.toggleBlog').click(function () {
		var that = $(this);
		var id = that.attr('_id');
		var removed = that.attr('removed');
		$.ajax({
			url: '/blogs/' + id + '/toggle?removed=' + removed,
			type: 'POST',
			success: function (result) {
				if (result == 'success') {
					location.reload();
				} else {
					alert('删除失败');
				}
			}
		});

	});

	// 置顶博客
	$('.stickBlog').click(function () {
		var that = $(this);
		var id = that.attr('_id');

		$.ajax({
			url: '/admin/blogs/' + id + '/sticky',
			type: 'POST',
			success: function (result) {
				if (result == 'success') {
					window.location.reload();
				} else {
					alert('置顶失败');
				}
			}
		});
	});

	// 点击类别下拉框
	$('#categoryList li').click(function () {
		$('#categoryName').val($(this).text());
		$('#categoryId').val($(this).attr('_id'));
	});

});

function validateLogin() {
	var reg = /\w@\w*\.\w/;
	var email = $('#loginEmail').val();
	var password = $('#loginPassword').val();
	if (email == null || email == '' || !reg.test(email)) {
		$('#loginEmail').popover('show');
		return false;
	}
	if (password == null || password == '') {
		$('#loginPassword').popover('show');
		return false;
	}
	return true;

}

function validateRegister() {
	var reg = /\w@\w*\.\w/;
	var email = $('#registerEmail').val();
	var username = $('#registerUsername').val();
	var password = $('#registerPassword').val();
	var passwordAgain = $('#registerPasswordAgain').val();
	if (email == null || email == '' || !reg.test(email)) {
		$('#registerEmail').popover('show');
		return false;
	}
	if (username == null || username == '') {
		$('#registerUsername').popover('show');
		return false;
	}
	if (password == null || password == '') {
		$('#registerPassword').popover('show');
		return false;
	}
	if (passwordAgain == null || passwordAgain == '') {
		$('#registerPasswordAgain').popover('show');
		return false;
	} else if (passwordAgain != password) {
		$('#registerPasswordAgain').attr("data-content", "<span style='color:red'>两次输入的密码不一致</span>");
		$('#registerPasswordAgain').popover('show');
		return false;
	}

	return true;
}