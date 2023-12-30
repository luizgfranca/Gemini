"use strict"
const { Transform } = require("stream");
const invalidate = require("../invalidate");

const validateUniqueNickname = new Transform({
    objectMode: true,
    transform({res, data}, _, callback) {
        if(!data.apelido 
            || typeof data.apelido != 'string'
            || data.apelido.length > 32
            || !data.nome 
            || typeof data.nome != 'string'
            || data.nome.length > 100
            || !data.nascimento
            || typeof data.nascimento != 'string'
        ) { invalidate(res) }

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

module.exports = validateUniqueNickname