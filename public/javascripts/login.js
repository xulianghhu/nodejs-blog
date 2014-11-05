/**
 * Created by Leo on 14-11-5.
 */
$(function () {
    $('.footer').hide();
    var front = document.getElementById('front')
        , back_content = document.getElementById('back').innerHTML
        , back;

    $('#register').click(function () {
        var timeout = 400;
        back = flippant.flip(front, back_content, 'card', 'login-bg-back', timeout);
        $('#loginEmail').popover('hide');
        $('#loginPassword').popover('hide');
        back.close();
        window.setTimeout(function () {
            $('#front').hide();
            $('#back').show();
        }, timeout);
    });

	$('#registerEmail').blur(function() {

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