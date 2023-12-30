const { Transform } = require("stream");

const validateRequiredFields = new Transform({
    objectMode: true,
    transform(request, _, callback) {
        if(!request.data.apelido || !request.data.nome || !request.data.nascimento) {
            
        }
    }
})