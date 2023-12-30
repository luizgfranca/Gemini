const databaseProvider = require("./database-pool")


async function onNotification(notification, callback) {
    const tryToSetListener = () => {
        try {
            console.log('trying to set change listener')
            databaseProvider.connectionPool.connect((err, client, done) => {
                console.log('onNotification');
                if (err) callback(null, done)
                client.query(`LISTEN ${notification}`)
                client.on('notification', (data) => callback(data.payload))
                process.on('exit', done)
            })
        } catch(e) {
            setTimeout(() => tryToSetListener(), 1000)
        }
        
    }
}

module.exports = onNotification