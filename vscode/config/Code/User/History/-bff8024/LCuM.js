const stream = require('stream');

const reduceArgs = new stream.Transform({
        objectMode: true,
        transform: (item, _, callback) => {
                        
        }
    }, 
)

module.exports = reduceArgs;