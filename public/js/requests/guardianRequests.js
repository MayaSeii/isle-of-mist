async function moveGuardian(id, posX, posY) {

    try {

        const response = await fetch(`/api/guardians/${id}/move`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ posX: posX, posY: posY })

        });

        if (response.status == 200) {

            var guardian = await response.json();
            return guardian;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function hurtGuardian(id, skill, dmg) {

    try {

        const response = await fetch(`/api/guardians/${id}/hurt`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ skill: skill, dmg: dmg })

        });

        if (response.status == 200) {

            var guardian = await response.json();
            return guardian;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function spawnGuardianEgg(id) {

    try {

        const response = await fetch(`/api/guardians/${id}/egg`, {
            method: 'post'
        });

        if (response.status == 200) {

            var guardian = await response.json();
            return guardian;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}