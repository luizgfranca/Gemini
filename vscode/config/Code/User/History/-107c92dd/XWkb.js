const databaseProvider = require("./database-pool")


async function onNotification(notification, callback) {
    databaseProvider.connectionPool.connect((err, client, done) => {
        console.log('onNotification');
        if (err) callback(null, done)
        client.query(`LISTEN ${notification}`)
        client.on('notification', (data) => console.log('notification', data))
        process.on('exit', done)
    })
}

module.exports = onNotification