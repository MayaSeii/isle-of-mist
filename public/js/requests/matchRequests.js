async function getMatch(id) {

    try {

        const response = await fetch(`/api/matches/${id}`);

        if (response.status == 200) {

            var match = await response.json();
            return match;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function getMatchActivePlayer(id) {

    try {

        const response = await fetch(`/api/matches/${id}/activeplayer`);

        if (response.status == 200) {

            var playerID = await response.json();
            return playerID;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function getMatchArena(id) {

    try {

        const response = await fetch(`/api/matches/${id}/arena`);

        if (response.status == 200) {

            var arena = await response.json();
            return arena.arn_rawcode;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function getMatchGuardian(id) {

    try {

        const response = await fetch(`/api/matches/${id}/guardian`);

        if (response.status == 200) {

            var guardian = await response.json();
            return guardian;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function newTurn(id) {

    try {

        const response = await fetch(`/api/matches/${id}/newTurn`, {

            method: 'post'

        });

        if (response.status == 200) {

            var match = await response.json();
            return match;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}