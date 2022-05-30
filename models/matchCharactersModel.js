var pool = require('./connection.js');

module.exports.getAllMatchCharacters = async function() {

    try {

        let query = 'SELECT * FROM matchcharacter';
        let result = await pool.query(query);
        let characters = result.rows;

        return { status: 200, result: characters };

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

            let character = result.rows[0];
            return { status: 200, result: character };

        } else return { status: 404, result: { msg: "No match character with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.getMatchCharacterSkills = async function(id) {

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

module.exports.resetMatchCharacterAP = async function(id, activePlayer) {

    try {

        let query = `UPDATE matchcharacter mc
                     SET mch_ap = CASE WHEN mch_ply_id = $2 THEN CASE WHEN mch_hasboon = TRUE THEN 7 ELSE 6 END ELSE mch_ap END,
                         mch_isguarding =  CASE WHEN mch_ply_id = $2 THEN FALSE ELSE mch_isguarding END
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

module.exports.guardMatchCharacter = async function(id) {

    try {

        let query = `UPDATE matchcharacter mc
                     SET mch_isguarding = CASE WHEN mch_ap < 1 THEN FALSE ELSE TRUE END,
                         mch_ap = CASE WHEN mch_ap < 1 THEN mch_ap ELSE mch_ap - 1 END
                     FROM character c
                     WHERE mc.mch_chr_id = c.chr_id
                     AND mc.mch_id = $1
                     RETURNING *`;
                     
        let result = await pool.query(query, [id]);

        if (result.rows.length > 0) {

            let character = result.rows[0];
            return { status: 200, result: character };

        } else return { status: 404, result: { msg: "No match character with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.newMatchCharacter = async function(x, y, baseID, playerID) {

    try {

        let query = `INSERT INTO matchcharacter (mch_positionx, mch_positiony, mch_ap, mch_hp, mch_hasegg, mch_hasboon, mch_chr_id, mch_isrecovering, mch_ply_id, mch_isguarding)
                     SELECT $1 AS mch_positionx,
                            $2 AS mch_positiony,
                            6 AS mch_ap,
                            chr_basehp AS mch_hp,
                            false AS mch_asegg,
                            false AS mch_hasboon,
                            $3 AS mch_chr_id,
                            false AS mch_isrecovering,
                            $4 AS mch_ply_id,
                            false AS mch_isguarding
                     FROM character WHERE chr_id = $3
                     RETURNING mch_id`;
                     
        let result = await pool.query(query, [x, y, baseID, playerID]);

        query = `INSERT INTO matchcharacterskill (mcs_mch_id, mcs_skl_id, mcs_canuse)
                 SELECT $1 AS mcs_mch_id,
                        cs.cs_skl_id AS mcs_skl_id,
                        true AS mcs_canuse
                 FROM character c INNER JOIN characterskill cs ON c.chr_id = cs.cs_chr_id
                 WHERE c.chr_id = $2`

        await pool.query(query, [result.rows[0].mch_id, baseID]);

        return { status: 200, result: { msg: 'Created new match character!' } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.deletePlayerMatchCharacters = async function(playerID) {

    try {

        let query = `DELETE FROM matchcharacterskill
                     WHERE mcs_mch_id IN (SELECT mch_id FROM matchcharacter WHERE mch_ply_id = $1)`;
        await pool.query(query, [playerID]);

        query = `DELETE FROM matchcharacter WHERE mch_ply_id = $1`;
        await pool.query(query, [playerID]);

        return { status: 200, result: { msg: 'Removed match characters!' } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}