const { Transform } = require("stream");

const validateRequiredFields = new Transform({
    objectMode: true,
    transform({req, res, data}, _, callback) {
        if(
            !data.apelido 
            || !data.nome 
            || !data.nascimento
        ) {
            
        }
    }
})