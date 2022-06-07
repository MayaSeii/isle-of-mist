var pool = require('./connection.js');

module.exports.state1 = async function(id1, id2, id3, id4, id5, id6, idg) {

    try {

        let query = `UPDATE matchcharacter mc
                     SET mch_ap = 6, mch_hp = c.chr_basehp, mch_positionx = 18, mch_positiony = 1, mch_hasegg = false
                     FROM character c
                     WHERE mc.mch_chr_id = c.chr_id
                     AND mc.mch_id = $1`;

        await pool.query(query, [id1]);

        query = `UPDATE matchcharacter mc
                 SET mch_ap = 6, mch_hp = c.chr_basehp, mch_positionx = 16, mch_positiony = 1, mch_hasegg = false
                 FROM character c
                 WHERE mc.mch_chr_id = c.chr_id 
                 AND mc.mch_id = $1`;

        await pool.query(query, [id2]);

        query = `UPDATE matchcharacter mc
                 SET mch_ap = 6, mch_hp = c.chr_basehp, mch_positionx = 17, mch_positiony = 1, mch_hasegg = false
                 FROM character c
                 WHERE mc.mch_chr_id = c.chr_id
                 AND mc.mch_id = $1`;

        await pool.query(query, [id3]);

        query = `UPDATE matchcharacter mc
                 SET mch_ap = 6, mch_hp = c.chr_basehp, mch_positionx = 1, mch_positiony = 18, mch_hasegg = false
                 FROM character c
                 WHERE mc.mch_chr_id = c.chr_id
                 AND mc.mch_id = $1`;

        await pool.query(query, [id4]);

        query = `UPDATE matchcharacter mc
                 SET mch_ap = 6, mch_hp = c.chr_basehp, mch_positionx = 2, mch_positiony = 18, mch_hasegg = false
                 FROM character c
                 WHERE mc.mch_chr_id = c.chr_id
                 AND mc.mch_id = $1`;

        await pool.query(query, [id5]);

        query = `UPDATE matchcharacter mc
                 SET mch_ap = 6, mch_hp = c.chr_basehp, mch_positionx = 3, mch_positiony = 18, mch_hasegg = false
                 FROM character c
                 WHERE mc.mch_chr_id = c.chr_id
                 AND mc.mch_id = $1`;

        await pool.query(query, [id6]);

        query = `UPDATE guardian
                 SET grd_positionx = 9, grd_positiony = 9, grd_hp = 50, grd_isegg = false
                 WHERE grd_id = $1`;

        await pool.query(query, [idg]);

        return { status: 200, result: { msg: 'State 1!' } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.state2 = async function(id1, id2, id3, id4, id5, id6, idg) {

    try {

        let query = `UPDATE matchcharacter mc
                     SET mch_ap = 6, mch_hp = 14, mch_positionx = 3, mch_positiony = 9, mch_hasegg = false
                     FROM character c
                     WHERE mc.mch_chr_id = c.chr_id
                     AND mc.mch_id = $1`;

        await pool.query(query, [id1]);

        query = `UPDATE matchcharacter mc
                 SET mch_ap = 6, mch_hp = 13, mch_positionx = 11, mch_positiony = 10, mch_hasegg = false
                 FROM character c
                 WHERE mc.mch_chr_id = c.chr_id 
                 AND mc.mch_id = $1`;

        await pool.query(query, [id2]);

        query = `UPDATE matchcharacter mc
                 SET mch_ap = 6, mch_hp = 19, mch_positionx = 11, mch_positiony = 9, mch_hasegg = false
                 FROM character c
                 WHERE mc.mch_chr_id = c.chr_id
                 AND mc.mch_id = $1`;

        await pool.query(query, [id3]);

        query = `UPDATE matchcharacter mc
                 SET mch_ap = 6, mch_hp = 21, mch_positionx = 4, mch_positiony = 6, mch_hasegg = false
                 FROM character c
                 WHERE mc.mch_chr_id = c.chr_id
                 AND mc.mch_id = $1`;

        await pool.query(query, [id4]);

        query = `UPDATE matchcharacter mc
                 SET mch_ap = 6, mch_hp = 12, mch_positionx = 5, mch_positiony = 8, mch_hasegg = false
                 FROM character c
                 WHERE mc.mch_chr_id = c.chr_id
                 AND mc.mch_id = $1`;

        await pool.query(query, [id5]);

        query = `UPDATE matchcharacter mc
                 SET mch_ap = 6, mch_hp = 10, mch_positionx = 12, mch_positiony = 7, mch_hasegg = false
                 FROM character c
                 WHERE mc.mch_chr_id = c.chr_id
                 AND mc.mch_id = $1`;

        await pool.query(query, [id6]);

        query = `UPDATE guardian
                 SET grd_positionx = 9, grd_positiony = 9, grd_hp = 17, grd_isegg = false
                 WHERE grd_id = $1`;

        await pool.query(query, [idg]);

        return { status: 200, result: { msg: 'State 2!' } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.state3 = async function(id1, id2, id3, id4, id5, id6, idg) {

    try {

        let query = `UPDATE matchcharacter mc
                     SET mch_ap = 6, mch_hp = 25, mch_positionx = 13, mch_positiony = 14, mch_hasegg = false
                     FROM character c
                     WHERE mc.mch_chr_id = c.chr_id
                     AND mc.mch_id = $1`;

        await pool.query(query, [id1]);

        query = `UPDATE matchcharacter mc
                 SET mch_ap = 6, mch_hp = 2, mch_positionx = 13, mch_positiony = 15, mch_hasegg = false
                 FROM character c
                 WHERE mc.mch_chr_id = c.chr_id 
                 AND mc.mch_id = $1`;

        await pool.query(query, [id2]);

        query = `UPDATE matchcharacter mc
                 SET mch_ap = 6, mch_hp = 7, mch_positionx = 14, mch_positiony = 14, mch_hasegg = false
                 FROM character c
                 WHERE mc.mch_chr_id = c.chr_id
                 AND mc.mch_id = $1`;

        await pool.query(query, [id3]);

        query = `UPDATE matchcharacter mc
                 SET mch_ap = 6, mch_hp = 21, mch_positionx = 16, mch_positiony = 10, mch_hasegg = false
                 FROM character c
                 WHERE mc.mch_chr_id = c.chr_id
                 AND mc.mch_id = $1`;

        await pool.query(query, [id4]);

        query = `UPDATE matchcharacter mc
                 SET mch_ap = 6, mch_hp = 6, mch_positionx = 13, mch_positiony = 12, mch_hasegg = false
                 FROM character c
                 WHERE mc.mch_chr_id = c.chr_id
                 AND mc.mch_id = $1`;

        await pool.query(query, [id5]);

        query = `UPDATE matchcharacter mc
                 SET mch_ap = 6, mch_hp = 6, mch_positionx = 15, mch_positiony = 13, mch_hasegg = false
                 FROM character c
                 WHERE mc.mch_chr_id = c.chr_id
                 AND mc.mch_id = $1`;

        await pool.query(query, [id6]);

        query = `UPDATE guardian
                 SET grd_positionx = 15, grd_positiony = 15, grd_hp = 0, grd_isegg = true
                 WHERE grd_id = $1`;

        await pool.query(query, [idg]);

        return { status: 200, result: { msg: 'State 3!' } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}