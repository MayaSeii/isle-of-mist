let pg = require('pg');
let util = require('util');
var path = require('path');
const bcrypt = require('bcrypt');

let pool = new pg.Pool({

  host: 'localhost',
  user: 'postgres',
  password: 'Cupk4keTiem!',
  database: 'IsleOfMist'

});

pool.query = util.promisify(pool.query);

process.once('SIGTERM', end);

function end() {

  server.close((err) => {

    if (err) throw err;
    
    pool.end((e) => {

      if (e) throw e;
      process.exit();

    });

  });

}

function select(data, table, fun) {

    let sql = `SELECT ${data} FROM ${table}`;
    pool.query(sql, fun);

}

module.exports = (app) => {

    app.get('/draft', (req, res) => {
        res.sendFile(path.resolve('public/draft.html'));
    });

    app.get('/characters', function (req, res) {

        select('*', 'character', (err, result) => {
    
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
    
        });
  
    });

    app.get('/api/players', (req, res) => {

        select('*', 'player', (err, result) => {
    
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

}