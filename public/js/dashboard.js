$(document).ready(async () => {

    /**
     * Client-side basic checks to ensure match credentials are formatted correctly.
     * @param {string} name - The match name.
     * @param {string} pass - The match password.
     * @returns {string} - An error message if the credentials are invalid, undefined otherwise.
     */
    function checkMatchCredentials(name, pass) {

        if (!name || name.length == 0 || !pass || pass.length == 0)
            return 'Room name and password must not be empty.';

        if (!/^([a-zA-Z0-9]+)$/.test(name))
            return 'Room name must only contain letters (a-z or A-Z) or numbers (0-9).';

        if (name.length > 16 || name.length < 5)
            return 'Room name must be between 5 and 16 characters.';

        if (pass.length < 6)
            return 'Room password must be 6 character or larger.';

        return undefined;

    }

    /**
     * Shows a verification error message.
     * @param {string} msg - The message to show.
     */
    function verificationError(msg) {

        $('#verification').html(msg);
        return $('#verification').slideDown(200);
    
    }

    /** Checks if the player is in a match. */
    async function checkIfInMatch() {

        const inMatch = await playerIsInMatch();

        if (inMatch) {

            $('#no-room').hide();
            $('#has-room').show();
            getOpponent();

        }

    }

    /** Gets the player's opponent. */
    async function getOpponent() {

        let match = await getPlayerMatch();
        if (match == undefined) return;

        if (match.m_opponent != null) {

            let opponent = await getPlayerName(match.m_opponent);
            if (opponent == undefined) return;

            $('#opponent').text(opponent.ply_name);

            $('#btn-start-match').attr('disabled', false);
            $('#btn-start-match').click(() => document.location.href = '/match/');

        } else {

            $('#opponent').text('(PENDING)');

            $('#btn-start-match').attr('disabled', true);
            $('#btn-start-match').click(() => { });

        }

    }

    // Displays the username for the logged-in user.
    const name = await getPlayerName();
    $('#user').html(name.ply_name);

    // Hides the verification messages when the user types on the input.
    $('#input-room-name').keydown(() => { $('#verification').slideUp(200) });
    $('#input-room-pass').keydown(() => { $('#verification').slideUp(200) });

    

    /** Ends the user's session. */
    $('#btn-signout').click(async () => {

        await logout(); // 401 if no session.
        document.location.href = '/';

    });

    /** Shows the match hosting panel. */
    $('#btn-host').click(() => {

        let $container = $('#dashboard-host');
        let changed = $('#btn-join-start').is(':visible');

        $('#btn-host-start').show();
        $('#btn-join-start').hide();

        if (changed) return;

        if ($container.is(':visible')) $('#dashboard-host').slideUp(200);
        else $('#dashboard-host').slideDown(200);

    });

    /** Shows the match joining panel. */
    $('#btn-join').click(() => {

        let $container = $('#dashboard-host');
        let changed = $('#btn-host-start').is(':visible');

        $('#btn-join-start').show();
        $('#btn-host-start').hide();

        if (changed) return;

        if ($container.is(':visible')) $('#dashboard-host').slideUp(200);
        else $('#dashboard-host').slideDown(200);

    });

    /** Hosts a match. */
    $('#btn-host-start').click(async () => {

        const name = $('#input-room-name').val().trim();
        const pass = $('#input-room-pass').val().trim();

        const error = checkMatchCredentials(name, pass);

        if (!error) {

            const matchCount = await getMatchCountByName(name);
            if (matchCount > 0) return verificationError('A room with this name already exists.');

            const response = await newMatch(name, pass);
            if (response.msg) verificationError(response.msg);

        } else return verificationError(error);

    });

    /** Joins a match. */
    $('#btn-join-start').click(async () => {

        const name = $('#input-room-name').val().trim();
        const pass = $('#input-room-pass').val().trim();

        const error = checkMatchCredentials(name, pass);

        if (!error) {

            const response = await joinMatch(name, pass);
            if (response.msg) verificationError(response.msg);

        } else return verificationError(error);

    });

    // Creates a loop to continuously check if the player is in a match.
    setInterval(checkIfInMatch, 500);

});