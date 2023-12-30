const { Transform } = require("stream");

const parse = new Transform({
    objectMode: true,
    transform({req, payload}, _, callback) {
        
    }
})