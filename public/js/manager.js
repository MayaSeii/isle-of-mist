async function getCharacters() {

    try {

        const response = await fetch('/api/characters');

        if (response.status == 200) {

            var characters = await response.json();
            return characters;

        } else {

            console.log(response);

        }

    } catch (err) {

        console.log(err);

    }

}

async function getGuardianById(id) {

    try {

        const response = await fetch(`/api/guardians/${id}`);

        if (response.status == 200) {

            var guardian = await response.json();
            return guardian.rowCount == 0 ? undefined : guardian.rows[0];

        } else {

            console.log(response);

        }

    } catch (err) {

        console.log(err);

    }

}

async function getCharacter(id) {

    try {

        const response = await fetch(`/api/characters/${id}`);

        if (response.status == 200) {

            var characters = await response.json();
            return characters.rowCount == 0 ? undefined : characters.rows[0];

        } else {

            console.log(response);

        }

    } catch (err) {

        console.log(err);

    }

}

async function getMatchDetails(id) {

    try {

        const response = await fetch(`/api/matches/${id}`);

        if (response.status == 200) {

            var match = await response.json();
            return match.rowCount == 0 ? undefined : match.rows[0];

        } else {

            console.log(response);

        }

    } catch (err) {

        console.log(err);

    }

}

async function getArenaCode(id) {

    try {

        const response = await fetch(`/api/arenas/${id}`);

        if (response.status == 200) {

            var arena = await response.json();
            return arena.rowCount == 0 ? undefined : arena.rows[0].rawcode;

        } else {

            console.log(response);

        }

    } catch (err) {

        console.log(err);

    }

}

async function updateCharacter(id, positionx, positiony) {

    try {

        fetch(`api/matchcharacters/${id}`, {

            method: 'post',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({

                positionx: positionx,
                positiony: positiony

            })

        });

        return 200;

    } catch (err) {

        console.log(err);
        return 0;
    }

}

async function getRooms() {

    try {

        const response = await fetch('/api/rooms');

        if (response.status == 200) {

            var rooms = await response.json();
            return rooms;

        } else {

            console.log(response);

        }

    } catch (err) {

        console.log(err);

    }

}

async function createRoom(name, password, user) {

    try {

        fetch('/api/newRoom', {

            method: 'post',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({

                name: name,
                password: password,
                user: user

            })

        });

        return 200;

    } catch (err) {

        console.log(err);
        return 0;
    }

}

async function getUserID(name) {

    try {

        const response = await fetch('/api/players');

        if (response.status == 200) {

            var players = await response.json();
            let id = -1;

            players.rows.forEach((e) => {

                if (e.name == name) id = e.id;

            });

            return id;

        } else {

            console.log(response);

        }

    } catch (err) {

        console.log(err);

    }

}