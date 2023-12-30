const queryPersonById = require("./find-person-by-id-pipeline/query-database")
const JSONStream = require('JSONStream')

async function findPersonById(req, res, id) {
    queryPersonById(id, (responseStream, done) => {
        responseStream
            .pipe
    })
}

module.exports = findPersonById