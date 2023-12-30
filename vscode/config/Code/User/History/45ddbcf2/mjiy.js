const Pool = require('pg-pool');
const url = require('url')

const params = url.parse(process.env.DATABASE_URL);

const config = {
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true
};

const dbPool = new Pool(config);

module.exports = dbPool;