const { Transform } = require("stream");

const validateRequiredFields = new Transform({
    objectMode: true,
    transform({res, data}, _, callback) {
        if(!data.apelido || !data.nome || !data.nascimento) {
            res.statusCode = 422,
            res.end();
        }

        callback(null, {res, data})
    }
})