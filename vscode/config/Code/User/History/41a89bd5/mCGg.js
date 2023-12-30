const stream = require('stream');

const time = new stream.Transform({
        objectMode: true,
        transform: (item, _, callback) => {
            new Date().toISOString();
        }
    }, 
)

module.exports = time;