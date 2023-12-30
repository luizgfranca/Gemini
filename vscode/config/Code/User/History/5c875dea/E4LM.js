"use strict"
const { Transform } = require("stream");
const invalidate = require("../invalidate");
const queryUniqueNickname = require("./query-unique-nickname");

const validateUniqueNickname = new Transform({
    objectMode: true,
    transform({res, data}, _, callback) {
        queryUniqueNickname(data.apelido, () => {
            
        })

        callback(null, {res, data})
    }
})

module.exports = validateUniqueNickname