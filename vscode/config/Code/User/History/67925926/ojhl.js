"use strict"
const QueryStream = require('pg-query-stream')
const JSONStream = require('JSONStream')
const { pool } = require('../provider/database-pool')

pool.connect((err, client, done) => {
  if (err) throw err

  const data = client.query('select count(*) as count from pessoa')
		.then(response => response.rows[0].)
		.catch(error => { throw error }) 
  
})


async function countPersons(req, res) {
    res.statusCode = 200;
    res.end('2');   
}

module.exports = countPersons;