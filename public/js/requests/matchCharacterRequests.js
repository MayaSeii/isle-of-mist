async function getMatchCharacter(id) {

    try {

        const response = await fetch(`/api/matchcharacters/${id}`);

        if (response.status == 200) {

            var character = await response.json();
            return character;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function getMatchCharacterSkills(id) {

    try {

        const response = await fetch(`/api/matchcharacters/${id}/skills`);

        if (response.status == 200) {

            var skills = await response.json();
            return skills;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function resetMatchCharacterAP(id, activePlayer) {

    try {

        const response = await fetch(`/api/matchcharacters/${id}/resetAP/${activePlayer}`, {

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

        const response = await fetch(`/api/matchcharacters/${id}/move`, {

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

        const response = await fetch(`/api/matchcharacters/${id}/hurt`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ skill: skill, dmg: dmg })

        });

        if (response.status == 200) {

            var character = await response.json();
            return character;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function hurtMatchCharacterByGuardian(id, closeRange) {

    try {

        const response = await fetch(`/api/matchcharacters/${id}/hurtByGuardian`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ closeRange: closeRange })

        });

        if (response.status == 200) {

            var character = await response.json();
            return character;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function guardMatchCharacters(id) {

    try {

        const response = await fetch(`/api/matchcharacters/${id}/guard`, {

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

async function grabEgg(id) {

    try {

        const response = await fetch(`/api/matchcharacters/${id}/grabEgg`, {
            method: 'post'
        });

        if (response.status == 200) {

            var character = await response.json();
            return character;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function releaseEgg(id) {

    try {

        const response = await fetch(`/api/matchcharacters/${id}/releaseEgg`, {
            method: 'post'
        });

        if (response.status == 200) {

            var character = await response.json();
            return character;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}

async function resetMatchCharacterOnDeath(id, posX, posY) {

    try {

        const response = await fetch(`/api/matchcharacters/${id}/resetOnDeath`, {

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

async function reduceMatchCharacterAP(id, amount) {

    try {

        const response = await fetch(`/api/matchcharacters/${id}/reduceAP`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount })

        });

        if (response.status == 200) {

            var character = await response.json();
            return character;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}