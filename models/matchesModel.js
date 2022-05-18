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

        let query = 'SELECT * FROM match WHERE m_id = $1';
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
                     INNER JOIN match ON match.m_arn_id = arena.arn_id
                     WHERE match.m_id = $1`;
                     
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
                     INNER JOIN match ON match.m_grd_id = guardian.grd_id
                     WHERE match.m_id = $1`;
                     
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

module.exports.getMatchCharacterById = async function(id) {

    try {

        let query = `SELECT * FROM matchcharacter
                     WHERE matchcharacter.mch_id = $1`;
                     
        let result = await pool.query(query, [id]);

        if (result.rows.length > 0) {

            let guardian = result.rows[0];
            return { status: 200, result: guardian };

        } else return { status: 404, result: { msg: "No match character with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.updateMatchCharacter = async function(id, character) {

    try {

        let query = `UPDATE matchcharacter
                     SET mch_positionx = $1, mch_positiony = $2, mch_hp = $3
                     WHERE matchcharacter.mch_id = $4
                     RETURNING *`;
                     
        let result = await pool.query(query, [character.positionx, character.positiony, character.hp, id]);

        if (result.rows.length > 0) {

            let character = result.rows;
            return { status: 200, result: character };

        } else return { status: 404, result: { msg: "No character with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.newTurn = async function(id) {

    try {

        let query = `UPDATE match
                     SET m_round = CASE WHEN m_activeplayer = m_playertwoid THEN m_round + 1 ELSE m_round END,
                         m_activeplayer = CASE WHEN m_activeplayer = m_playeroneid THEN m_playertwoid ELSE m_playeroneid END
                     WHERE match.m_id = $1
                     RETURNING *`;
                     
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