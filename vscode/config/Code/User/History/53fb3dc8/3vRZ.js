const QueryStream = require('pg-query-stream')
const databaseProvider = require("../../provider/database-pool");

const findByTermQuery = (searchTerm) => `SELECT * 
FROM pessoa p
WHERE ( UPPER(p.apelido) LIKE '%${searchTerm.toUpperCase()}%' ) OR 
			( UPPER(p.nome) LIKE '%${searchTerm.toUpperCase()}%' ) OR
      ( p.id IN (SELECT si.id_pessoa
                 FROM search_index_stack_pessoa si
                 WHERE si.stack_item LIKE '%${searchTerm.toUpperCase()}%')
      )
LIMIT 50`;

async function queryPersonsByTerm(searchTerm, callback) {
    databaseProvider.connectionPool.connect((err, client, done) => {
        if (err) callback(null, done)
        console.log(findByTermQuery(searchTerm))
        const responseStream = client.query(new QueryStream(findByTermQuery(searchTerm), []));
        
        callback(responseStream, done);
    })
}

module.exports = queryPersonsByTerm;