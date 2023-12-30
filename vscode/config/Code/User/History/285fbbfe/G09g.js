"use strict"

const invalidate = require("./create-person-pipeline/invalidate");

async function findPersonsByTerm(req, res, url) {
    const term = url.searchParams.get('t');
    if(!term) return invalidate(res);

    
}

module.exports = findPersonsByTerm;