var pool = require('./connection.js');

module.exports.newGuardian = async function() {

    try {

        let query = `INSERT INTO guardian (grd_positionx, grd_positiony, grd_hp, grd_isegg)
                     VALUES (9, 9, 50, false)
                     RETURNING grd_id`;
                     
        let result = await pool.query(query);

        if (result.rows.length > 0) {

            let guardian = result.rows[0];
            return { status: 200, result: guardian };

        } else return { status: 404, result: { msg: "No guardian with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.moveGuardian = async function(id, posX, posY) {

    try {

        let query = `UPDATE guardian
                     SET grd_positionx = $1, grd_positiony = $2
                     WHERE grd_id = $3
                     RETURNING *`;
                     
        let result = await pool.query(query, [posX, posY, id]);

        if (result.rows.length > 0) {

            let guardian = result.rows[0];
            return { status: 200, result: guardian };

        } else return { status: 404, result: { msg: "No guardian with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.hurtGuardian = async function(id, skillId, dmg) {

    try {

        let query = `UPDATE guardian g
                     SET grd_hp = GREATEST(0, grd_hp - ((FLOOR(RANDOM() * (s.skl_dicetype - 1 + 1)) + 1) + $3))
                     FROM skill s
                     WHERE g.grd_id = $1
                     AND s.skl_id = $2
                     RETURNING g.*`;
                     
        let result = await pool.query(query, [id, skillId, dmg]);

        if (result.rows.length > 0) {

            let guardian = result.rows[0];
            return { status: 200, result: guardian };

        } else return { status: 404, result: { msg: "No guardian with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.spawnEgg = async function(id) {

    try {

        let query = `UPDATE guardian
                     SET grd_isegg = true
                     WHERE grd_id = $1
                     RETURNING *`;
                     
        let result = await pool.query(query, [id]);

        if (result.rows.length > 0) {

            let guardian = result.rows[0];
            return { status: 200, result: guardian };

        } else return { status: 404, result: { msg: "No guardian with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}