const QueryStream = require('pg-query-stream')
const databaseProvider = require("../../provider/database-pool");

const findByIdQuery = (id) => `select count(*) from pessoa p where id = '${id}'`;

async function queryUniqueNickname(name, callback) {
    databaseProvider.connectionPool.connect((err, client, done) => {
        if (err) callback(null, done)
        const responseStream = client.query(new QueryStream(findByIdQuery(id), []));
        
        callback(responseStream, done);
    })
}

module.exports = queryUniqueNickname;