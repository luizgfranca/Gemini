const QueryStream = require('pg-query-stream')
const databaseProvider = require("../../provider/database-pool");

const countNicknameOcurrenciesQuery = (nickname) => `select count(*) from pessoa p where id = '${nickname}'`;

async function queryUniqueNickname(nickname, callback) {
    databaseProvider.connectionPool.connect((err, client, done) => {
        if (err) callback(null, done)
        const responseStream = client.query(new QueryStream(countNicknameOcurrenciesQuery(id), []));
        
        callback(responseStream, done);
    })
}

module.exports = queryUniqueNickname;