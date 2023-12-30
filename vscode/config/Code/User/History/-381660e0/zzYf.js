"use strict"
const stream = require('stream');

const { wrap } = require('module');
const validateFields = require('./create-person-pipeline/validation/fields');
const save = require('./create-person-pipeline/save');
const invalidate = require('./create-person-pipeline/invalidate');
const requestAccumulator = require('./create-person-pipeline/request-accumulator');
const parse = require('./create-person-pipeline/parse');

const createPersonStream = new stream.Readable({objectMode: true, read(){}});

stream.pipeline(
    createPersonStream,
    requestAccumulator,
    parse,
    validateFields,
    save,
    (error) => console.error(error)
)

async function createPerson(req, res) {
    res.on('error', (error) => console.error(error))
    createPersonStream.push({ req, res });
}

module.exports = createPerson;