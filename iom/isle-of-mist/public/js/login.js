function showRegister(delay = 200) {

    $('#group-register').show();
    $('#group-confirm').slideDown(delay);
    $('#group-login').hide();

    $('#verification').slideUp(delay);
    $('#input-confirm').val('');

}

function showLogin(delay = 200) {

    $('#group-register').hide();
    $('#group-confirm').slideUp(delay);
    $('#group-login').show();

    $('#verification').slideUp(delay);

}

$(document).ready(() => {

    $('#input-username').keydown(() => { $('#verification').slideUp(200) });
    $('#input-password').keydown(() => { $('#verification').slideUp(200) });
    $('#input-confirm') .keydown(() => { $('#verification').slideUp(200) });

    // User login.
    $('#btn-login').click((e) => {

        e.preventDefault();

        // Gets the user-written username and password.
        let u = $('#input-username').val();
        let p = $('#input-password').val();

        // Checks if both the username and password are filled.
        if (!u.trim() || u.length === 0 || !p.trim() || p.length === 0) {

            $('#verification').html('Username and password must not be empty.')
            return $('#verification').slideDown(200);

        }

        // Creates a login object.
        let login = {

            username: u,
            password: p

        };

        $.ajax({

            url: '/api/login',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(login),

            success: function(response, status, http) {

                // Checks if the user exists on the database.
                if (response.rowCount <= 0) {

                    $('#input-username').val('');
                    $('#input-password').val('');

                    $('#verification').html('Invalid username or password! Please try again.')
                    return $('#verification').slideDown(200);

                }
                
                alert("Welcome, " + response.rows[0].name + "!");

            }
    
        });

    });

    // User registration.
    $('#btn-register').click((e) => {

        e.preventDefault();

        // Gets the user-written username and password.
        let u = $('#input-username').val();
        let p = $('#input-password').val();
        let c = $('#input-confirm').val();

        // Checks if all the fields are filled.
        if (!u.trim() || u.length === 0 || !p.trim() || p.length === 0 || !c.trim() || c.length === 0) {

            $('#verification').html('All fields must not be empty.')
            return $('#verification').slideDown(200);

        }

        // Checks if the password and confirmation are the same.
        if (c.trim() !== p.trim()) {

            $('#verification').html('Password and confirmation must be the same.')
            return $('#verification').slideDown(200);

        }

        // Creates a login object.
        let login = {

            username: u,
            password: p

        };

        $.ajax({

            url: '/api/register',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(login),

            success: function(response, status, http) {

                $('#input-username').val('');
                $('#input-password').val('');
                $('#input-confirm').val('');

                showLogin(0);

                toastr.success(`Account ${login.username} registered successfully.`, {

                    tapToDismiss: false,
                    toastClass: 'toast-success',

                    showDuration: 300,
                    hideDuration: 100,

                    iconClass: ''

                });

            }
    
        });

    });

});