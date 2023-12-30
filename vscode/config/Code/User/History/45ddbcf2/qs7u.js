"use strict"

const Pool = require('pg-pool');
const url = require('url')

// const params = url.parse(process.env.DATABASE_URL);

const config = {
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  ssl: false
};

// const config = {
//     user: 'postgres',
//     password: 'password',
//     host: 'localhost',
//     port: 5432,
//     database: 'postgres',
//     ssl: false
//   };


// var pool2 = new Pool({
//     database: 'postgres',
//     user: 'brianc',
//     password: 'secret!',
//     port: 5432,
//     ssl: true,
//     max: 20, // set pool max size to 20
//     idleTimeoutMillis: 1000, // close idle clients after 1 second
//     connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
//     maxUses: 7500, // close (and replace) a connection after it has been used 7500 times (see below for discussion)
//   })

console.log('database config: ', config)

class DatabaseProvider {
    constructor() {
        this.connectionPool = null;
        this.setupConnectionPool();
    }
    setupConnectionPool() {
        this.connectionPool = new Pool(config);
    }
}

const databaseProvider = new DatabaseProvider();

module.exports = databaseProvider;