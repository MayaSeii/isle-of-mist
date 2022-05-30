/**
 * Shows the registering fields.
 * @param {number} delay - The sliding animation timing.
 */
function showRegister(delay = 200) {

    $('#group-register').show();
    $('#group-confirm').slideDown(delay);
    $('#group-login').hide();

    $('#verification').slideUp(delay);
    $('#input-confirm').val('');

}

/**
 * Shows only the login fields.
 * @param {number} delay - The sliding animation timing.
 */
function showLogin(delay = 200) {

    $('#group-register').hide();
    $('#group-confirm').slideUp(delay);
    $('#group-login').show();

    $('#verification').slideUp(delay);

}

$(document).ready(() => {

    /**
     * Shows a verification error message.
     * @param {string} msg - The message to show.
     */
    function verificationError(msg) {

        $('#verification').html(msg);
        return $('#verification').slideDown(200);

    }

    // Hides the verification error text when typing.
    $('#input-username').keydown(() => { $('#verification').slideUp(200) });
    $('#input-password').keydown(() => { $('#verification').slideUp(200) });
    $('#input-confirm') .keydown(() => { $('#verification').slideUp(200) });

    /** User login function. */
    $('#btn-login').click(async (e) => {

        e.preventDefault();

        // Gets the user-written username and password.
        let u = $('#input-username').val().trim();
        let p = $('#input-password').val().trim();

        // Checks if both the username and password are filled.
        if (!u.trim() || u.length === 0 || !p.trim() || p.length === 0)
            return verificationError('Username and password must not be empty.');

        let loginResponse = await login(u, p);

        // Logs the user in only if a player object is received (meaning the password was valid).
        if (loginResponse.ply_id != undefined) {

            sessionStorage.setItem('currentAccount', loginResponse.ply_id);
            document.location.href = '/dashboard';

        } else {

            $('#verification').html(loginResponse.msg);
            return $('#verification').slideDown(200);

        }

    });

    /** User registration function. */
    $('#btn-register').click(async (e) => {

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

        // Checks if the username is already taken.
        let checkIfExists = await getPlayerByName(u);
        if (checkIfExists) return verificationError('Username is taken!');

        // Registers the user.
        let registerResponse = await register(u, p);
        
        $('#input-username').val('');
        $('#input-password').val('');
        $('#input-confirm').val('');

        showLogin(0);

        // Shows a success notification with the registration message.
        toastr.success(registerResponse.msg, {

            tapToDismiss: false,
            toastClass: 'toast-success',

            showDuration: 300,
            hideDuration: 100,

            iconClass: ''

        });

    });

});