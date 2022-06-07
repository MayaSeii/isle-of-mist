async function getMatch(id) {

    try {

        const response = await fetch(`/api/matches/${id}`);

        if (response.status == 200) {

            var match = await response.json();
            return match;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function getMatchCountByName(name) {

    try {

        const response = await fetch(`/api/matches/count/${name}`);

        if (response.status == 200) {

            var result = await response.json();
            return result;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function newMatch(matchName, matchPass) {

    try {

        const response = await fetch(`/api/matches/newMatch`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ matchName: matchName, matchPass: matchPass })

        });

        var result = await response.json();
        return result;

    } catch (err) { console.log(err); }

}

async function joinMatch(matchName, matchPass) {

    try {

        const response = await fetch(`/api/matches/joinMatch`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ matchName: matchName, matchPass: matchPass })

        });

        var result = await response.json();
        return result;

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

async function playerIsInMatch() {

    try {

        const response = await fetch(`/api/matches/isInMatch`, {
            credentials: 'include'
        });

        if (response.status == 200) {

            var result = await response.json();
            return result;

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

async function setWinner(id, winnerId) {

    try {

        const response = await fetch(`/api/matches/${id}/winner`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ winnerId: winnerId })

        });

        if (response.status == 200) {

            var match = await response.json();
            return match;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function deleteMatch(match) {

    try {

        const response = await fetch(`/api/matches/delete`, {

            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ match: match })

        });

        if (response.status == 200) {

            var res = await response.json();
            return res;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}