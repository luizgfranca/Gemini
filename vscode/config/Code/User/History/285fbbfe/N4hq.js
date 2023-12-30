"use strict"

const invalidate = require("./create-person-pipeline/invalidate");
const queryPersonsByTerm = require("./find-person-by-term-pipeline/query-database");

async function findPersonsByTerm(req, res, url) {
    const term = url.searchParams.get('t');
    if(!term) return invalidate(res);

    queryPersonsByTerm(term, (responseStream, done) => {
        
    })    
}

module.exports = findPersonsByTerm;