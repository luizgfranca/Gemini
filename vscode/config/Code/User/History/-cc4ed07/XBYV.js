const { Transform } = require("stream");

const queryDatabase = new Transform({
    objectMode: true,
    transform({res, id}, _, callback) {
        
    }
})