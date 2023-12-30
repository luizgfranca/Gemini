const databaseProvider = require("./database-pool")


async function onNotification(notification, callback) {
    databaseProvider.connectionPool.connect((err, client, done) => {
        if (err) callback(null, done)
        client.query(`LISTEN ${notification}`)
        client.on('notification', (data) => callback(data.payload))
        process.on('exit', done)
    })
}

module.exports = onNotification