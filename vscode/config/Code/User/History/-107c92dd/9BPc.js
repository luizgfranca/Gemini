const databaseProvider = require("./database-pool")


async function onNotification(notification, callback) {
    databaseProvider.connectionPool.connect((err, client, done) => {
        if (err) callback(null, done)
        client.on('notification', (data) => console.log('notification', data))
        
        callback(responseStream, done);
    })
}

module.exports = onNotification