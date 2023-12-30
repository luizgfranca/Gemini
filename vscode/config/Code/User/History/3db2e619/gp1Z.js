const notFound = require("../not-found")
const queryPersonById = require("./find-person-by-id-pipeline/query-database")
const JSONStream = require('JSONStream')

async function personNotFound(res, callback) {
    notFound(res);
    callback()
}

async function findPersonById(req, res, id) {
    queryPersonById(id, (responseStream, done) => {
        if(!responseStream) {
            notFound(res)
            return done()
        }

        responseStream.on('error' () => )

        res.statusCode = 200
        responseStream.on('end', done)

        responseStream
            .pipe(JSONStream.stringify())
            .pipe(res)
    })
}

module.exports = findPersonById