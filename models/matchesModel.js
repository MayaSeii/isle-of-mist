var pool = require('./connection.js');

module.exports.getAllMatches = async function() {

    try {

        let query = 'SELECT * FROM match';
        let result = await pool.query(query);
        let matches = result.rows;

        return { status: 200, result: matches };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.getMatchById = async function(id) {

    try {

        let query = 'SELECT * FROM match WHERE id = $1';
        let result = await pool.query(query, [id]);

        if (result.rows.length > 0) {

            let match = result.rows[0];
            return { status: 200, result: match };

        } else return { status: 404, result: { msg: "No match with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.getMatchArena = async function(id) {

    try {

        let query = `SELECT * FROM arena
                     INNER JOIN match ON match.arenaid = arena.id
                     WHERE match.id = $1`;
                     
        let result = await pool.query(query, [id]);

        if (result.rows.length > 0) {

            let arena = result.rows[0];
            return { status: 200, result: arena };

        } else return { status: 404, result: { msg: "No match with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.getMatchGuardian = async function(id) {

    try {

        let query = `SELECT * FROM guardian
                     INNER JOIN match ON match.guardianid = guardian.id
                     WHERE match.id = $1`;
                     
        let result = await pool.query(query, [id]);

        if (result.rows.length > 0) {

            let guardian = result.rows[0];
            return { status: 200, result: guardian };

        } else return { status: 404, result: { msg: "No match with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.updateMatchCharacter = async function(id, character) {

    try {

        let query = `UPDATE matchcharacter
                     SET matchcharacter.positionx = $1, matchcharacter.positiony = $2
                     WHERE matchcharacter.id = $3`;
                     
        let result = await pool.query(query, [character.positionx, character.positiony, id]);

        if (result.rows.length > 0) {

            let character = result.rows;
            return { status: 200, result: character };

        } else return { status: 404, result: { msg: "No character with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}