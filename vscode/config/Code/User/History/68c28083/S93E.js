"use strict"
"use strict"
const { Transform } = require("stream");
const databaseProvider = require("../../provider/database-pool");

function insertStatement({apelido, nome, nascimento, stack}) {
    return `insert into pessoa (
        apelido,
        nome,
        nascimento,
        stack
     ) values (
        ${apelido},
        ${nome},
        ${nascimento},
        ${stack ? `"${JSON.stringify(stack)}"` : 'null'}
     );`
}

async function created(res) {
    res.statusCode = 201;
    res.end();
}

const save = new Transform({
    objectMode: true,
    transform({res, data}, _, callback) {
        console.log(data)
        databaseProvider.connectionPool
            .query(insertStatement(data))
            .then(() => created(res))
            .catch((err) => { throw err })
    }
})

module.exports = save;