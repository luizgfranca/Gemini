const { randomUUID } = require("crypto");
const { Transform } = require("stream");

const generateId = new Transform({
    objectMode: true,
    transform({res, data}, _, callback) {
        callback(null,{
            res,
            data: {
                ...data,
                id: randomUUID()
            },
        })
    }
})

module.exports = generateId;