"use strict"

const Pool = require('pg-pool');
const url = require('url')

// const params = url.parse(process.env.DATABASE_URL);

// const config = {
//   user: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   host: params.hostname,
//   port: params.port,
//   database: params.pathname.split('/')[1],
//   ssl: true
// };


class DatabaseProvider {
    constructor() {
        this.connectionPool = null;
        this.setupConnectionPool();
    }
    setupConnectionPool() {
        const params = url.parse('localhost:5432/postgres')

        this.connectionPool = new Pool({
            user: 'root',
            password: 'password',
            host: params.hostname,
            port: params.port,
            database: params.pathname.split('/')[1],
            ssl: true
          });
    }
}

module.exports = DatabaseProvider;