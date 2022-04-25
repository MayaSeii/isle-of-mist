/* FILE WILL BE REMOVED IN FUTURE VERSIONS, SORRY! */

const bcrypt = require('bcrypt');
var pool = require('../models/connection.js');

function select(data, table, fun) {

    let sql = `SELECT ${data} FROM ${table}`;
    pool.query(sql, fun);

}

module.exports = (app) => {

    app.get('/api/players', (req, res) => {

        select('*', 'player', (err, result) => {
    
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
    
        });

    });

    app.get('/api/rooms', (req, res) => {

        select('*', 'match', (err, result) => {
    
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
    
        });

    });

    app.post('/api/newRoom', (req, res) => {

        // Gets the username and password from the request body.
        let name = req.body.name;
        let password = req.body.password;
        let user = req.body.user;

        console.log(user)

        bcrypt.hash(password, 10, (err, encrypted) => {

            password = encrypted;
            
            // Creates the SQL query.
            let sql = `INSERT INTO match (name, password, playeroneid, turn)
            VALUES ($1, $2, $3, 1)`;

            // Executes the query.
            pool.query(sql, [name, password, user], (err, result) => {

                if (err) return res.status(500).send(err);
                return res.status(200).send(result);

            });

        });

    });

    app.get('/api/players/:username', (req, res) => {

        let sql = `SELECT * FROM player WHERE name = $1`;

        pool.query(sql, [req.params.username], (err, result) => {
    
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
    
        });

    });

    app.get('/api/matches/:id', (req, res) => {

        let sql = `SELECT * FROM match WHERE id = $1`;

        pool.query(sql, [req.params.id], (err, result) => {
    
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
    
        });

    });

    app.get('/api/arenas/:id', (req, res) => {

        let sql = `SELECT * FROM arena WHERE id = $1`;

        pool.query(sql, [req.params.id], (err, result) => {
    
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
    
        });

    });

    app.get('/api/matchcharacters/:playerId', (req, res) => {

        let sql = `SELECT * FROM matchcharacter
                   INNER JOIN character ON matchcharacter.characterid = character.id
                   WHERE playerid = $1`;

        pool.query(sql, [req.params.playerId], (err, result) => {
    
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
    
        });

    });

    app.get('/api/guardians/:id', (req, res) => {

        let sql = `SELECT * FROM guardian WHERE id = $1`;

        pool.query(sql, [req.params.id], (err, result) => {
    
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
    
        });

    });

    app.post('/api/login', (req, res) => {

        // Gets the username and password from the request body.
        let username = req.body.username;
        let password = req.body.password;

        // Creates the SQL query.
        let sql = `SELECT * FROM player WHERE name = '${username}'`;

        // Executes the query.
        pool.query(sql, (err, result) => {

            if (err) return res.status(500).send(err);
            if (result.rowCount == 0) return res.status(200).send(result);

            let pass = result.rows[0].password;

            // Checks if the password is correct.
            bcrypt.compare(password, pass, function(err, valid) {
                
                if (valid) res.status(200).send(result);
                else res.status(200).send({ rowCount: 0 });

            });

        });

    });

    app.post('/api/register', (req, res) => {

        // Gets the username and password from the request body.
        let username = req.body.username;
        let password = req.body.password;

        bcrypt.hash(password, 10, (err, encrypted) => {

            password = encrypted;
            
            // Creates the SQL query.
            let sql = `INSERT INTO player (name, password)
            VALUES ('${username}', '${password}')`;

            // Executes the query.
            pool.query(sql, (err, result) => {

                if (err) return res.status(500).send(err);
                return res.status(200).send(result);

            });

        });

    });

    app.post('/api/matchcharacters/:id', (req, res) => {

        // Gets the position from the request body.
        let positionx = req.body.positionx;
        let positiony = req.body.positiony;
            
        // Creates the SQL query.
        let sql = `UPDATE matchcharacter
                    SET positionx = $1, positiony = $2
                    WHERE mcid = $3`;

        // Executes the query.
        pool.query(sql, [positionx, positiony, req.params.id], (err, result) => {

            if (err) return res.status(500).send(err);
            return res.status(200).send(result);

        });

    });

}