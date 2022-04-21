$(document).ready(() => {

    // Displays the username for the logged-in user.
    $('#user').html(sessionStorage.getItem('currentAccount'));

    // Hides the verification messages when the user types on the input.
    $('#input-room-name').keydown(() => { $('#verification').slideUp(200) });
    $('#input-room-pass').keydown(() => { $('#verification').slideUp(200) });

    $('#btn-signout').click(() => {

        sessionStorage.removeItem('currentAccount');
        document.location.href = '/';

    });

    $('#btn-host').click(() => {

        let $container = $('#dashboard-host');
        let changed = $('#btn-join-start').is(':visible');

        $('#btn-host-start').show();
        $('#btn-join-start').hide();

        if (changed) return;

        if ($container.is(':visible')) $('#dashboard-host').slideUp(200);
        else $('#dashboard-host').slideDown(200);

    });

    $('#btn-join').click(() => {

        let $container = $('#dashboard-host');
        let changed = $('#btn-host-start').is(':visible');

        $('#btn-join-start').show();
        $('#btn-host-start').hide();

        if (changed) return;

        if ($container.is(':visible')) $('#dashboard-host').slideUp(200);
        else $('#dashboard-host').slideDown(200);

    });

    $('#btn-host-start').click(async () => {

        let name = $('#input-room-name').val().trim();
        let pass = $('#input-room-pass').val().trim();

        let valid = await checkRoomCredentials(name, pass);

        if (valid == '') {

            let rooms = await getRooms();

            $.each(rooms.rows, (i, val) => {
                if (val.name == name) valid = 'A room with this name already exists.';
            });

        }
        
        if (valid == '') {

            let userID = await getUserID($('#user').html());
            let response = await createRoom(name, pass, userID);
            
            if (response == 200) {

            }

        } else verificationError(valid);

    });

    $('#btn-join-start').click(async () => {

        let name = $('#input-room-name').val().trim();
        let pass = $('#input-room-pass').val().trim();

        let valid = await checkRoomCredentials(name, pass);

        if (valid == '') {

            let rooms = await getRooms();
            let foundRoom = false;

            $.each(rooms.rows, (i, val) => {
                if (val.name == name && val.password == pass) foundRoom = true;
            });

            if (!foundRoom) valid = 'Invalid room name or password.'

        }
        
        if (valid == '') return alert('Room would be joined!');
        else verificationError(valid);

    });

    // Checks if a room's credentials are valid.
    async function checkRoomCredentials(name, pass) {

        if (!name || name.length == 0 || !pass || pass.length == 0)
            return 'Room name and password must not be empty.';

        if (!/^([a-zA-Z0-9]+)$/.test(name))
            return 'Room name must only contain letters (a-z or A-Z) or numbers (0-9).';

        if (name.length > 16 || name.length < 5)
            return 'Room name must be between 5 and 16 characters.';

        if (pass.length < 6)
            return 'Room password must be 6 character or larger.';

        return '';

    }

    function verificationError(msg) {

        $('#verification').html(msg);
        return $('#verification').slideDown(200);
    
    }

});