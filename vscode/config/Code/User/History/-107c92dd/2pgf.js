const databaseProvider = require("./database-pool")


async function onNotification(notification, callback) {
    databaseProvider.connectionPool.connect((err, client, done) => {
        console.log('onNotification');
        if (err) callback(null, done)
        client.query('LISTEN insert_completed')
        client.on('notification', (data) => console.log('notification', data))
        process.on('beforeExit', done)
    })
}

module.exports = onNotification