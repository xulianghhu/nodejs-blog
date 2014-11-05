/**
 * Created by Leo on 14-11-5.
 */
function Ajax() {
}

Ajax.prototype = {

	ajax: function (url, type, data, successfn) {
		$.ajax({
			url: url,
			type: type,
			data: data,
			dataType: "JSON",
			success: successfn,
			err: function (err) {
				alert("operation failed");
			}
		});
	},

	post: function (url, data, successfn) {
		this.ajax(url, "POST", data, successfn);
	},

	delete: function (url, successfn) {
		this.ajax(url, "DELETE", {}, successfn);
	}
}