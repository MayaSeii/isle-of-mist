async function getSkill(id) {

    try {

        const response = await fetch(`/api/skills/${id}`);

        if (response.status == 200) {

            var skill = await response.json();
            return skill;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function markSkillAsUsed(charId, id) {

    try {

        const response = await fetch(`/api/skills/match/${id}/${charId}`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

        });

        if (response.status == 200) {

            var skill = await response.json();
            return skill;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function markSkillAsUnused(charId, id) {

    try {

        const response = await fetch(`/api/skills/match/unused/${id}/${charId}`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

        });

        if (response.status == 200) {

            var skill = await response.json();
            return skill;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}