const stream = require('stream');


const build = new stream.Transform({
        objectMode: true,
        transform: (item, _, callback) => {
            const { time, type, message } = item;
            console[item.data.logType](`[${time}] ${type}: ${message}`)
            callback();
        }
    }, 
)