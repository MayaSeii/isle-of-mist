async function getPlayer(id) {

    try {

        const response = await fetch(`/api/players/${id}`, {
            credentials: 'include'
        });

        if (response.status == 200) {

            var player = await response.json();
            return player;

        } else { console.log(response); }

    } catch (err) { console.log(err); }


}

async function getCurrentPlayerID() {

    try {

        const response = await fetch(`/api/players/current`, {
            credentials: 'include'
        });

        if (response.status == 200) {

            var player = await response.json();
            return player;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function getPlayerMatch(id) {

    try {

        const newID = id || -1;
        const response = await fetch(`/api/players/${newID}/match`);

        if (response.status == 200) {

            var name = await response.json();
            return name;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function getPlayerName(id) {

    try {

        const newID = id || -1;
        const response = await fetch(`/api/players/${newID}/name`);

        if (response.status == 200) {

            var name = await response.json();
            return name;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function getPlayerByName(name) {

    try {

        const response = await fetch(`/api/players/name/${name}`, {
            credentials: 'include'
        });

        if (response.status == 200) {

            var characters = await response.json();
            return characters;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function login(username, password) {

    try {

        const response = await fetch(`/api/players/login`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password }),
            credentials: 'include'

        });

        // Since a 401 is also expected, we don't test for 200.
        var result = await response.json();
        return result;

    } catch (err) { console.log(err); }

}

async function register(username, password) {

    try {

        const response = await fetch(`/api/players/register`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password }),
            credentials: 'include'

        });

        if (response.status == 200) {

            var result = await response.json();
            return result;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function logout() {

    try {

        const response = await fetch(`/api/players/logout`, {

            method: 'post',
            credentials: 'include'

        });

        // Since a 401 is also expected, we don't test for 200.
        var result = await response.json();
        return result;

    } catch (err) { console.log(err); }

}

async function getPlayerCharacters(id) {

    try {

        const response = await fetch(`/api/players/${id}/characters`, {
            credentials: 'include'
        });

        if (response.status == 200) {

            var characters = await response.json();
            return characters;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}
