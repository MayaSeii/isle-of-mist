async function getMatch(id) {

    try {

        const response = await fetch(`/api/matches/${id}`);

        if (response.status == 200) {

            var match = await response.json();
            return match;

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

async function updateMatchCharacter(id, character) {

    try {

        const response = await fetch(`/api/matches/characters/${id}`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ character: character })

        });

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

async function getMatchCharacter(id) {

    try {

        const response = await fetch(`/api/matches/characters/${id}`);

        if (response.status == 200) {

            var character = await response.json();
            return character;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function getMatchCharacterSkills(id) {

    try {

        const response = await fetch(`/api/matches/characters/${id}/skills`);

        if (response.status == 200) {

            var skills = await response.json();
            return skills;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function resetMatchCharacterAP(id, activePlayer) {

    try {

        const response = await fetch(`/api/matches/characters/${id}/resetAP/${activePlayer}`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

        });

        if (response.status == 200) {

            var character = await response.json();
            return character;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function moveMatchCharacter(id, posX, posY) {

    try {

        const response = await fetch(`/api/matches/characters/${id}/move`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ posX: posX, posY: posY })

        });

        if (response.status == 200) {

            var character = await response.json();
            return character;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function hurtMatchCharacter(id, skill, dmg) {

    try {

        const response = await fetch(`/api/matches/characters/${id}/hurt/${skill}/${dmg}`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

        });

        if (response.status == 200) {

            var character = await response.json();
            return character;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function guardMatchCharacters(id) {

    try {

        const response = await fetch(`/api/matches/characters/${id}/guard`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

        });

        if (response.status == 200) {

            var character = await response.json();
            return character;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}