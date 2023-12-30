"use strict"
const { Transform } = require("stream");
const invalidate = require("../invalidate");
const badRequest = require("../../../bad-request");

const validateFields = new Transform({
    objectMode: true,
    transform({res, data}, _, callback) {
        if(!data.apelido || !data.nome || !data.nascimento) {
            invalidate(res)
        }

        if(
            typeof data.apelido != 'string'
            || data.apelido.length > 32
            || typeof data.nome != 'string'
            || data.nome.length > 100
            || typeof data.nascimento != 'string'
        ) { badRequest(res) }

        try {
            new Date(Date.parse(data.nascimento))
        } catch { invalidate(res) }

        if(data.stack) {
            for(const item of items) {
                if (
                    item === null 
                    || typeof item !== 'string' 
                    || ( 
                        typeof item === 'string' 
                        && item.length > 32
                    )
                ) { return invalidate(res) }
            }
        }

        callback(null, {res, data})
    }
})

module.exports = validateFields