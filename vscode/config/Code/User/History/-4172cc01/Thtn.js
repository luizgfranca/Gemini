"use strict"
const { Transform } = require("stream");

const validateFields = new Transform({
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
        ) {
            res.statusCode = 422,
            res.end();
        }

        try {
            new Date(Date.parse(data.nascimento))
        } catch {
            res.statusCode = 422,
            res.end();
        }

        callback(null, {res, data})
    }
})

module.exports = validateFields