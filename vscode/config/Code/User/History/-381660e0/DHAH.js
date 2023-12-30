"use strict"
const stream = require('stream');

const { wrap } = require('module');
const validateFields = require('./create-person-pipeline/validation/fields');
const save = require('./create-person-pipeline/save');
const invalidate = require('./create-person-pipeline/invalidate');
const requestAccumulator = require('./create-person-pipeline/request-accumulator');

const createPersonStream = new stream.Readable({read(){}});

stream.pipeline(
    createPersonStream,
    requestAccumulator,
    wrap(res),
    parse,
    validateFields,
    save,
    () => invalidate(res)
)

async function createPerson(req, res) {
    
}

module.exports = createPerson;