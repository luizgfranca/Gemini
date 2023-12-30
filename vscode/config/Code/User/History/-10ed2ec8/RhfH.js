const stream = require('stream');

const wrap = new stream.Transform({
        objectMode: true,
        transform: (data, _, callback) => {
            callback(null, { data, type: data.logType })
        }
    }, 
)

module.exports = wrap;