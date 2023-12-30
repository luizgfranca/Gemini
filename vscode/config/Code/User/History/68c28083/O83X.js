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

async function created(res) {
    res.statusCode = 201;
    res.end();
}

const save = new Transform({
    objectMode: true,
    transform({res, data}, _, callback) {
        databaseProvider.connectionPool
            .query(insertStatement(data))
            .catch((err) => { throw err })

        created(res);
        callback();
    }
})

module.exports = save;