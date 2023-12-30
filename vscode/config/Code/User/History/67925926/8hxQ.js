"use strict"
const DatabaseProvider = require("../provider/database-pool");

async function countPersons(req, res) {
	DatabaseProvider.connectionPool.connect((err, client, done) => {
		if (err) throw err
	
		client.query('select count(*) as count from pessoa')
			.then(response => {
				res.statusCode = 200;
				return res.end(response.rows[0].count);   
			})
			.catch(error => { throw error }) 
	})
}

module.exports = countPersons;