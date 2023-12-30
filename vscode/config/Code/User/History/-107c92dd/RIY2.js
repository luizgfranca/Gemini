const databaseProvider = require("./database-pool")


async function onNotification(notification, callback) {
    while(true) {
        
    }

    databaseProvider.connectionPool.connect((err, client, done) => {
        console.log('onNotification');
        if (err) callback(null, done)
        client.query(`LISTEN ${notification}`)
        client.on('notification', (data) => callback(data.payload))
        process.on('exit', done)
    })
}

module.exports = onNotification