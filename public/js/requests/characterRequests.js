async function getCharacter(id) {

    try {

        const response = await fetch(`/api/characters/${id}`);

        if (response.status == 200) {

            var character = await response.json();
            return character;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function getCharacterSkills(id) {

    try {

        const response = await fetch(`/api/characters/${id}/skills`);

        if (response.status == 200) {

            var skills = await response.json();
            return skills;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}