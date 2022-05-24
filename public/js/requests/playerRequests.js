async function getPlayerCharacters(id) {

    try {

        const response = await fetch(`/api/players/${id}/characters`);

        if (response.status == 200) {

            var characters = await response.json();
            return characters;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function getPlayer(id) {

    try {

        const response = await fetch(`/api/players/${id}`);

        if (response.status == 200) {

            var player = await response.json();
            return player;

        } else { console.log(response); }

    } catch (err) { console.log(err); }


}

async function getPlayerByName(name) {

    try {

        const response = await fetch(`/api/players/name/${name}`);

        if (response.status == 200) {

            var characters = await response.json();
            return characters;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}