"use strict"
const { Transform } = require("stream");
const invalidate = require("../invalidate");
const queryUniqueNickname = require("./query-unique-nickname");
const databaseProvider = require("../../../provider/database-pool");

const countNicknameOcurrenciesQuery = (nickname) => 
    `select count(*) as count from pessoa p where p.apelido = '${nickname}'`;

const validateUniqueNickname = new Transform({
    objectMode: true,
    transform({res, data}, _, callback) {
        console.log(countNicknameOcurrenciesQuery(data.apelido));
        databaseProvider.connectionPool
            .query(countNicknameOcurrenciesQuery(data.apelido))
            .then((result) => {
                console.log('result', result);
                result.rows[0].count === '1'
                    ? invalidate(res) 
                    : callback(null, {res, data})}
            )
    }
})

module.exports = validateUniqueNickname