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
        let u = $('#input-username').val().trim();
        let p = $('#input-password').val().trim();

        // Checks if both the username and password are filled.
        if (!u.trim() || u.length === 0 || !p.trim() || p.length === 0)
            return verificationError('Username and password must not be empty.');

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

            success: function(response) {

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
        let u = $('#input-username').val().trim();
        let p = $('#input-password').val().trim();
        let c = $('#input-confirm').val().trim();

        // Checks if all the fields are filled.
        if (!u || u.length === 0 || !p || p.length === 0 || !c || c.length === 0)
            return verificationError('All fields must not be empty.');

        // Checks if the username contains only letters and numbers.
        if (!/^([a-zA-Z0-9]+)$/.test(u)) 
            return verificationError('Username must only contain letters (a-z or A-Z) and numbers (0-9).');

        // Checks if the username is between 5 and 16 characters.
        if (u.length > 16 || u.length < 5)
            return verificationError('Username must be between 5 and 16 characters.');

        // Checks if the password is 6 characters or larger.
        if (p.length < 6)
            return verificationError('Password must be 6 characters or larger.');

        // Checks if the password and confirmation are the same.
        if (c !== p)
            return verificationError('Password and confirmation must be the same.');

        // Creates a login object.
        let login = {

            username: u,
            password: p

        };

        $.ajax({

            url: `/api/players/${u}`,
            type: 'GET',

            success: function(response) {

                // Checks if the user exists on the database.
                if (response.rowCount > 0)
                    return verificationError('Username is taken!');
                
                $.ajax({

                    url: '/api/register',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(login),
        
                    success: function() {
        
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

            }
    
        });

    });

});

function verificationError(msg) {

    $('#verification').html(msg);
    return $('#verification').slideDown(200);

}