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

module.exports.getMatchCharacterSkillsById = async function(id) {

    try {

        let query = `SELECT matchcharacterskill.*, skill.* FROM matchcharacterskill
                     INNER JOIN matchcharacter ON matchcharacter.mch_id = matchcharacterskill.mcs_mch_id
                     INNER JOIN skill ON skill.skl_id = matchcharacterskill.mcs_skl_id
                     WHERE matchcharacter.mch_id = $1`;
                     
        let result = await pool.query(query, [id]);

        if (result.rows.length > 0) {

            let skills = result.rows;
            return { status: 200, result: skills };

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

module.exports.resetMatchCharacterAP = async function(id, activePlayer) {

    try {

        let query = `UPDATE matchcharacter mc
                     SET mch_ap = CASE WHEN mch_ply_id = $2 THEN CASE WHEN mch_hasboon = TRUE THEN 7 ELSE 6 END ELSE mch_ap END
                     FROM character c
                     WHERE mc.mch_chr_id = c.chr_id
                     AND mc.mch_id = $1
                     RETURNING *`;
                     
        let result = await pool.query(query, [id, activePlayer]);

        if (result.rows.length > 0) {

            let character = result.rows[0];
            return { status: 200, result: character };

        } else return { status: 404, result: { msg: "No match character with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.moveMatchCharacter = async function(id, posX, posY) {

    try {

        let query = `UPDATE matchcharacter mc
                     SET mch_positionx = CASE WHEN (ABS($2 - mch_positionx) + ABS($3 - mch_positiony) <= mch_ap) THEN $2 ELSE mch_positionx END,
                         mch_positiony = CASE WHEN (ABS($2 - mch_positionx) + ABS($3 - mch_positiony) <= mch_ap) THEN $3 ELSE mch_positiony END,
                         mch_ap = CASE WHEN (ABS($2 - mch_positionx) + ABS($3 - mch_positiony) <= mch_ap) THEN GREATEST(mch_ap - (ABS($2 - mch_positionx) + ABS($3 - mch_positiony)), 0) ELSE mch_ap END
                     FROM character c
                     WHERE mc.mch_chr_id = c.chr_id
                     AND mc.mch_id = $1
                     RETURNING *`;
                     
                     
        let result = await pool.query(query, [id, posX, posY]);

        if (result.rows.length > 0) {

            let character = result.rows[0];
            return { status: 200, result: character };

        } else return { status: 404, result: { msg: "No match character with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.hurtMatchCharacter = async function(id, skillId, dmg) {

    try {

        let query = `UPDATE matchcharacter mc
                     SET mch_hp = GREATEST(0, mch_hp - ((FLOOR(RANDOM() * (s.skl_dicetype - 1 + 1)) + 1) + $3))
                     FROM character c CROSS JOIN skill s
                     WHERE mc.mch_chr_id = c.chr_id
                     AND mc.mch_id = $1
                     AND s.skl_id = $2
                     RETURNING mc.*, c.*`;
                     
        let result = await pool.query(query, [id, skillId, dmg]);

        if (result.rows.length > 0) {

            let character = result.rows[0];
            return { status: 200, result: character };

        } else return { status: 404, result: { msg: "No match character with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}