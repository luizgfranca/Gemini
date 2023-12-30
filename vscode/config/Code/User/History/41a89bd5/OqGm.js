const stream = require('stream');

const time = new stream.Transform({
        objectMode: true,
        transform: (item, _, callback) => {
            callback(null, {
                ...item,
                time: new Date().toISOString()
            })
        }
    }, 
)

module.exports = time;