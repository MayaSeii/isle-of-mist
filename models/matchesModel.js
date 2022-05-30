var pool = require('./connection.js');
const { newMatchCharacter, deletePlayerMatchCharacters } = require('./matchCharactersModel.js');

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

module.exports.matchCountByName = async function(matchName) {

    try {

        let query = 'SELECT * FROM match WHERE m_name = $1';
        let result = await pool.query(query, [matchName]);

        let res = result.rowCount;
        return { status: 200, result: res };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.playerIsInMatch = async function(playerID) {

    try {

        let query = 'SELECT * FROM match WHERE m_playeroneid = $1 OR m_playertwoid = $1';
        let result = await pool.query(query, [playerID]);

        return { status: 200, result: result.rows.length > 0 };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.joinMatch = async function(matchName, matchPass, playerID) {

    try {

        let inMatch = await module.exports.playerIsInMatch(playerID);
        if (inMatch.result) return { status: 409, result: { msg: 'Already in a match!' } };

        let query = `UPDATE match SET m_playertwoid = $3
                     WHERE m_name = $1 AND m_password = $2 AND m_playeroneid != $3 AND m_playertwoid IS NULL
                     RETURNING m_id`;

        let result = await pool.query(query, [matchName, matchPass, playerID]);

        if (result.rows.length > 0) {

            // FOR PROTOTYPE ONLY - WON'T BE IN FINAL VERSION.
            // Adds three fixed characters.
            await newMatchCharacter(1, 18, 4, playerID);
            await newMatchCharacter(2, 18, 5, playerID);
            await newMatchCharacter(3, 18, 6, playerID);

            let matchID = result.rows[0];
            return { status: 200, result: matchID };

        } else return { status: 401, result: { msg: 'Invalid match. Check your credentials or if you\'re the owner of the match.' } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.newMatch = async function(matchName, matchPass, playerID) {

    try {

        let inMatch = await module.exports.playerIsInMatch(playerID);
        if (inMatch.result) return { status: 409, result: { msg: 'Already in a match!' } };

        let query = `INSERT INTO match (m_name, m_password, m_playeroneid, m_round, m_arn_id, m_grd_id, m_activeplayer)
                     VALUES ($1, $2, $3, 1, 1, 1, $3)`;

        // FOR PROTOTYPE ONLY - WON'T BE IN FINAL VERSION.
        // Adds three fixed characters.
        await newMatchCharacter(18, 1, 1, playerID);
        await newMatchCharacter(17, 1, 2, playerID);
        await newMatchCharacter(16, 1, 3, playerID);

        await pool.query(query, [matchName, matchPass, playerID]);
        return { status: 200, result: { msg: `Room ${matchName} created!` } };       

    } catch {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.deleteMatch = async function(match) {

    try {

        const id1 = match.m_playeroneid;
        const id2 = match.m_playertwoid;

        await deletePlayerMatchCharacters(id1);
        await deletePlayerMatchCharacters(id2);

        let query = `DELETE FROM match WHERE m_id = $1`;

        await pool.query(query, [match.m_id]);
        return { status: 200, result: { msg: `Match between P${id1} and P${id2} deleted!` } };       

    } catch {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.getMatchActivePlayer = async function(id) {

    try {

        let query = 'SELECT m_activeplayer FROM match WHERE m_id = $1';
        let result = await pool.query(query, [id]);

        if (result.rows.length > 0) {

            let playerId = result.rows[0];
            return { status: 200, result: playerId };

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