const stream = require('stream');


const build = new stream.Transform({
        objectMode: true,
        transform: (item, _, callback) => {
            const { time, type, message } = item;
            item.logString = `[${time}] ${type}: ${message}`;
            callback(null, item);
        }
    }, 
)