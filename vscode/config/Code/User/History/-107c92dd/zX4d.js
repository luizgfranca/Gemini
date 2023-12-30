const databaseProvider = require("./database-pool")


async function onNotification(notification, callback) {
    databaseProvider.connectionPool.connect((err, client, done) => {
        if (err) callback(null, done)
        const responseStream = client.query(new QueryStream(findByIdQuery(id), []));
        
        callback(responseStream, done);
    })
}

module.exports = onNotification