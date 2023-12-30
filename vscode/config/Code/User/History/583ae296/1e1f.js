const { Transform } = require("stream");

const wrap = (res) => new Transform({
    objectMode: true,
    transform: (payload, _, callback) {
        callback(null, {res, payload})
    }
})