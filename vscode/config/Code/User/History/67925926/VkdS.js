"use strict"
const databaseProvider = require("../provider/database-pool");

async function countPersons(req, res) {
	console.log('countpersons')
	databaseProvider.connectionPool
		.query('select count(*) as count from pessoa')
		.then(response => {
			console.log('query responded')
			res.statusCode = 200;
			return res.end(response.rows[0].count);   
		})
		.catch(error => { 
			console.error(error)
			throw error 
		})
		.finally(() => console.log('finally'));
}

module.exports = countPersons;