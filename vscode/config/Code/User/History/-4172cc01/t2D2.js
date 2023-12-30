"use strict"
const { Transform } = require("stream");
const invalidate = require("../invalidate");

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
        ) { invalidate(res) }

        try {
            new Date(Date.parse(data.nascimento))
        } catch { invalidate(res) }

        if(data.stack) {
            data.stack.forEach(item => typeof item === 'object' ?? invalidate(res));
            data.stack = data.stack.map(item => item.toString())
        }

        console.log('fields validated');
        callback(null, {res, data})
    }
})

module.exports = validateFields