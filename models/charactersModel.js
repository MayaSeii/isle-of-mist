var pool = require('./connection.js');

module.exports.getAllCharacters = async function() {

    try {

        let query = 'SELECT * FROM character';
        let result = await pool.query(query);
        let characters = result.rows;

        return { status: 200, result: characters };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.getCharacterById = async function(id) {

    try {

        let query = 'SELECT * FROM character WHERE id = $1';
        let result = await pool.query(query, [id]);

        if (result.rows.length > 0) {

            let character = result.rows[0];
            return { status: 200, result: character };

        } else return { status: 404, result: { msg: "No character with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.getCharacterSkills = async function(id) {

    try {

        let query = `SELECT * FROM skill
                     INNER JOIN characterskill ON characterskill.skillid = skill.id
                     WHERE characterskill.charid = $1`;
                     
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