var pg = require('pg');

// Grabs the database URL from the .env file.
const connectionString = process.env.DATABASE_URL;

// Creates a new Postgres pool.
const pool = new pg.Pool({

    connectionString,
    max: 10,
    ssl: {
        require: true, 
        rejectUnauthorized: false
    }

});

module.exports = pool;