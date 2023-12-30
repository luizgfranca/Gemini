"use strict"
const databaseProvider = require("../provider/database-pool");

async function countPersons(req, res) {
	databaseProvider.connectionPool
		.query('select count(*) as count from pessoa')
		.then(response => {
			res.statusCode = 200;
			return res.end(response.rows[0].count);   
		})
		.catch(error => { 
			console.error('ERROR countPersons', error)
			res.statusCode = 400;
			return res.end();
		})
}

module.exports = countPersons;