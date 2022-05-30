async function getSkill(id) {

    try {

        const response = await fetch(`/api/skills/${id}`);

        if (response.status == 200) {

            var skill = await response.json();
            return skill;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function markSkillAsUsed(charID, id) {

    try {

        const response = await fetch(`/api/used`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, charID: charID })

        });

        if (response.status == 200) {

            var skill = await response.json();
            return skill;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function markSkillAsUnused(charID, id) {

    try {

        const response = await fetch(`/api/unused`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, charID: charID })

        });

        if (response.status == 200) {

            var skill = await response.json();
            return skill;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}