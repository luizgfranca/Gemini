"use strict"

const invalidate = require("./create-person-pipeline/invalidate");
const queryPersonsByTerm = require("./find-person-by-term-pipeline/query-database");
const JSONStream = require('JSONStream')

async function findPersonsByTerm(req, res, url) {
    const term = url.searchParams.get('t');
    if(!term) return invalidate(res);

    queryPersonsByTerm(term, (responseStream, done) => {
        if(!responseStream) {
            emptyList(res)
            return done()
        }

        responseStream.on('error', () => personNotFound(res, done))

        res.statusCode = 200
        responseStream.on('end', done)

        responseStream
            .pipe(JSONStream.stringify())
            .pipe(res)
    })    
}

module.exports = findPersonsByTerm;