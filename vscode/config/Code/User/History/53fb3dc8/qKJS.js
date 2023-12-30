const QueryStream = require('pg-query-stream')
const databaseProvider = require("../../provider/database-pool");

const findByTermQuery = (searchTerm) => `SELECT * 
FROM pessoa p
WHERE ( UPPER(p.apelido) LIKE '%${searchTerm}%' ) OR 
			( UPPER(p.nome) LIKE '%${searchTerm}%' ) OR
      ( p.id IN (SELECT si.id_pessoa
                 FROM search_index_stack_pessoa si
                 WHERE si.stack_item LIKE '%${searchTerm}%')
      )
LIMIT 50`;

async function queryPersonById(id, callback) {
    databaseProvider.connectionPool.connect((err, client, done) => {
        if (err) callback(null, done)
        const responseStream = client.query(new QueryStream(findByTermQuery(id), []));
        
        callback(responseStream, done);
    })
}

module.exports = queryPersonById;