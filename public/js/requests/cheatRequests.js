async function cheat(state, id1, id2, id3, id4, id5, id6, idg) {

    try {

        const response = await fetch(`/api/cheats/${state}`, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id1: id1, id2: id2, id3: id3, id4: id4, id5: id5, id6: id6, idg: idg })

        });

        if (response.status == 200) {

            var match = await response.json();
            return match;

        } else { console.log(response); }

    } catch (err) { console.log(err); }

}