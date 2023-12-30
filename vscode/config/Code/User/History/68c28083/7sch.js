"use strict"

const { Transform } = require("stream");
const databaseProvider = require("../../provider/database-pool");

function insertStatement({apelido, nome, nascimento, stack}) {
    `insert into pessoa (
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

const save = new Transform({
    objectMode: true,
    transform({res, data}, _, callback) {
        databaseProvider.connectionPool.query(insertStatement(data))
    }
})