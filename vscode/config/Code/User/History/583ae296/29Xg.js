const { Transform } = require("stream");

const wrap = new Transform({
    objectMode: true,
    transform: (payload, _, callback) {

    }
})