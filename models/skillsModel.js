var pool = require('./connection.js');

module.exports.getAllSkills = async function() {

    try {

        let query = 'SELECT * FROM skill';
        let result = await pool.query(query);
        let skills = result.rows;

        return { status: 200, result: skills };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}

module.exports.getSkillById = async function(id) {

    try {

        let query = 'SELECT * FROM skill WHERE skl_id = $1';
        let result = await pool.query(query, [id]);

        if (result.rows.length > 0) {

            let skill = result.rows[0];
            return { status: 200, result: skill };

        } else return { status: 404, result: { msg: "No skill with that ID!" } };

    } catch (err) {

        console.log(err);
        return { status: 500, result: err };

    }

}