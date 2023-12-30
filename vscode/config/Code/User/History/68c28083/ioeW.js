"use strict"

const { Transform } = require("stream");
const databaseProvider = require("../../provider/database-pool");

function insertStatement({apelido, nome, nascimento, stack}) {
    
}

const save = new Transform({
    objectMode: true,
    transform({res, data}, _, callback) {
        databaseProvider.connectionPool.query('')
    }
})