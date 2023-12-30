const stream = require('stream');


const print = new stream.Transform({
        objectMode: true,
        transform: (item, _, callback) => {
            const { time, type, message } = item;
            console[item.data.logType](`[${time}] ${type}: ${message}`)
        }
    }, 
)