const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'qazpoi',
        database: 'birthdays'
    }
});

module.exports = knex;