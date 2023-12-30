"use strict"
const { Transform } = require("stream");
const invalidate = require("../invalidate");
const queryUniqueNickname = require("./query-unique-nickname");
const databaseProvider = require("../../../provider/database-pool");

const countNicknameOcurrenciesQuery = (nickname) => 
    `select count(*) from pessoa p where p.apelido = '${nickname}'`;

const validateUniqueNickname = new Transform({
    objectMode: true,
    transform({res, data}, _, callback) {
        databaseProvider.connectionPool.query()

        callback(null, {res, data})
    }
})

module.exports = validateUniqueNickname