const { Transform } = require("stream");

const save = new Transform({
    objectMode: true,
    transform({res, data}, _, callback) {
        
    }
})