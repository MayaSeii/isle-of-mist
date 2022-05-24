async function getSkill(id) {

    try {

        const response = await fetch(`/api/skills/${id}`);

        if (response.status == 200) {

            var skill = await response.json();
            return skill;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}