const { Transform } = require("stream");

const getPayload = new Transform({
    objectMode: true,
    transform({req, res}, _, callback) {
        
    }
})