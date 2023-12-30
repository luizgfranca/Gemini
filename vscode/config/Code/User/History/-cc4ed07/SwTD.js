const QueryStream = require('pg-query-stream')
const databaseProvider = require("../../provider/database-pool");

const findByIdQuery = (id) => `select * from pessoas where id = ${id}`;

async function queryPersonById(id, callback) {
    databaseProvider.connectionPool.connect((err, client, done) => {
        if (err) throw err
        const responseStream = client.query(new QueryStream(findByIdQuery(id), [1000000]));
        
        callback(responseStream, done);
    })
}

module.exports = queryPersonById;