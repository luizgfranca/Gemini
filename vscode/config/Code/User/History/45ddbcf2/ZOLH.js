const Pool = require('pg-pool');
const url = require('url')

// const params = url.parse(process.env.DATABASE_URL);
const params = url.parse('localhost:5432/postgres')

const config = {
    user: 'root',
    password: 'password',
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };

// const config = {
//   user: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   host: params.hostname,
//   port: params.port,
//   database: params.pathname.split('/')[1],
//   ssl: true
// };


const pool = new Pool(config);

module.exports = { pool };