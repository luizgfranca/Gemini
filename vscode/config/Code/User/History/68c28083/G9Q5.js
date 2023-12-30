"use strict"
"use strict"
const { Transform } = require("stream");
const databaseProvider = require("../../provider/database-pool");

function insertStatement({id, apelido, nome, nascimento, stack}) {
    return `insert into pessoa (
        id,
        apelido,
        nome,
        nascimento,
        stack
     ) values (
        '${id}',
        '${apelido}',
        '${nome}',
        '${nascimento}',
        ${stack ? `'${JSON.stringify(stack)}'` : 'null'}
     );`
}

async function created(res, id) {
    res
        .writeHead(200, {'Location': `/pessoas/${id}`})
        .end()
}

const save = new Transform({
    objectMode: true,
    transform({res, data}, _, callback) {
        databaseProvider.connectionPool
            .query(insertStatement(data))
            .catch((err) => { throw err })

        created(res, data.id);
        callback();
    }
})

module.exports = save;