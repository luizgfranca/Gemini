const { Transform } = require("stream");
const invalidate = require("./invalidate");

const parse = new Transform({
    objectMode: true,
    transform({res, payload}, _, callback) {
        try {
            callback(null, {res, data: JSON.parse(payload)})
        } catch {
            invalidate(res)
        }
        
    }
})

module.exports = parse