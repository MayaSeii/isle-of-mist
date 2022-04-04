function showRegister() {

    $('#group-register').show();
    $('#group-confirm').slideDown(200);
    $('#group-login').hide();

}

function showLogin() {

    $('#group-register').hide();
    $('#group-confirm').slideUp(200);
    $('#group-login').show();

}