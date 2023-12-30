const stream = require('stream');

const logTimeTransformer = new stream.Transform({
        objectMode: true,
        transform: (item, _, callback) => {
            new Date().toISOString();
        }
    }, 
)