const stream = require('stream');


const print = new stream.Transform({
        objectMode: true,
        transform: (item, _, callback) => {
            const {

            } = item;

            console[item.data.logType]
        }
    }, 
)