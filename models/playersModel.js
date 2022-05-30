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

        let query = 'SELECT * FROM player WHERE ply_id = $1';
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

module.exports.getPlayerByName = async function(name) {

    try {

        let query = 'SELECT * FROM player WHERE ply_name = $1';
        let result = await pool.query(query, [name]);

        if (result.rows.length > 0) {

            let player = result.rows[0];
            return { status: 200, result: player };

        } else return { status: 404, result: { msg: "No player with that name!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.getPlayerName = async function(id) {

    try {

        let query = `SELECT ply_name FROM player WHERE ply_id = $1`;
                     
        let result = await pool.query(query, [id]);

        if (result.rows.length > 0) {

            let name = result.rows[0];
            return { status: 200, result: name };

        } else return { status: 404, result: { msg: "No player with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }  

}

module.exports.getPlayerMatch = async function(id) {

    try {

        let query = `SELECT m_id, CASE WHEN m_playeroneid = $1 THEN m_playertwoid ELSE m_playeroneid END AS m_opponent
                     FROM match WHERE m_playeroneid = $1 OR m_playertwoid = $1`;
                     
        let result = await pool.query(query, [id]);

        if (result.rows.length > 0) {

            let match = result.rows[0];
            return { status: 200, result: match };

        } else return { status: 404, result: { msg: "No player with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.getPlayerCharacters = async function(id) {

    try {

        let query = `SELECT * FROM matchcharacter
                     INNER JOIN player ON matchcharacter.mch_ply_id = player.ply_id
                     INNER JOIN character ON matchcharacter.mch_chr_id = character.chr_id
                     WHERE player.ply_id = $1`;
                     
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

module.exports.login = async function(username) {

    try {

        let query = 'SELECT * FROM player WHERE ply_name = $1';
        let result = await pool.query(query, [username]);

        if (result.rows.length > 0) {

            let player = result.rows[0];
            return { status: 200, result: player };

        } else return { status: 401, result: { msg: 'Invalid username or password! Please try again.' } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.register = async function(username, password) {

    try {

        let query = `INSERT INTO player (ply_name, ply_password)
                     VALUES ($1, $2)`;

        await pool.query(query, [username, password]);
        return { status: 200, result: { msg: `Account ${username} registered successfully!` } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}