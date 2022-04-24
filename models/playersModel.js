var pool = require('./connection.js');

module.exports.getAllPlayers = async function() {

    try {

        let query = 'SELECT * FROM player';
        let result = await pool.query(query);
        let players = result.rows;

        return { status: 200, result: players };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.getPlayerById = async function(id) {

    try {

        let query = 'SELECT * FROM player WHERE id = $1';
        let result = await pool.query(query, [id]);

        if (result.rows.length > 0) {

            let player = result.rows[0];
            return { status: 200, result: player };

        } else return { status: 404, result: { msg: "No player with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.getPlayerCharacters = async function(id) {

    try {

        let query = `SELECT * FROM matchcharacter
                     INNER JOIN player ON matchcharacter.playerid = player.id
                     INNER JOIN character ON matchcharacter.characterid = character.id
                     WHERE player.id = $1`;
                     
        let result = await pool.query(query, [id]);

        if (result.rows.length > 0) {

            let characters = result.rows;
            return { status: 200, result: characters };

        } else return { status: 404, result: { msg: "No player with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}