$(function() {

	var url = window.location.href;
	var arr = url.split("//");
	var path = arr[1].substring(arr[1].indexOf("/"));
	if (path.indexOf('/blogs')==0) {
		$('#blog').addClass('active');
	} else if (path.indexOf('/about')==0) {
		$('#about').addClass('active');
	} else if (path.indexOf('/admin')==0) {
		$('#admin').addClass('active');
	}

	$('.removeCategory').click(function() {
	
		var that = $(this);
		var id = that.attr('_id');
		
		$.ajax({
			url: '/categories/' + id,
			type: 'DELETE',
			success: function(result) {
				if (result == 'success') {
					that.parent().parent().parent().remove();
				} else {
					alert('删除失败');
				}
			}
		});
	});
	
	$('.removeBlog').click(function() {
		var that = $(this);
		var id = that.attr('_id');
		
		$.ajax({
			url: '/blogs/' + id,
			type: 'DELETE',
			success: function(result) {
				if (result == 'success') {
					that.parent().parent().parent().remove();
				} else {
					alert('删除失败');
				}
			}
		});
	});
	
	$('.stickBlog').click(function() {
		var that = $(this);
		var id = that.attr('_id');
		
		$.ajax({
			url: '/admin/blogs/' + id + '/sticky',
			type: 'POST',
			success: function(result) {
				if (result == 'success') {
					window.location.reload();
				} else {
					alert('置顶失败');
				}
			}
		});
	});
	
	$('#categoryList li').click(function() {
		$('#categoryName').val($(this).text());
		$('#categoryId').val($(this).attr('_id'));
	});
	
});


