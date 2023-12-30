"use strict"
const stream = require('stream');
const accumulator = require('./create-person-pipeline/accumulator');

const createPersonStream = new stream.Readable({ read() {} });


async function createPerson(req, res) {
    stream.pipeline(
        req,
        accumulator(),
        
    )
}

module.exports = createPerson;