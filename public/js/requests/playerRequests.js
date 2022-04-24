async function getPlayerCharacters(id) {

    try {

        const response = await fetch(`/api/players/${id}/characters`);

        if (response.status == 200) {

            var characters = await response.json();
            return characters;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}