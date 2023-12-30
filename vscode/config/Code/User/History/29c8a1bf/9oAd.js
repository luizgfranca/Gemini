const stream = require('stream');


const print = new stream.Transform({
        objectMode: true,
        transform: (item, _, callback) => {
            console[item.data.logType](item.logString)
            callback();
        }
    }, 
)

module.exports = print;