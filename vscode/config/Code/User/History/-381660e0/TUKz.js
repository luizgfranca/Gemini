"use strict"
const stream = require('stream');
const accumulator = require('./create-person-pipeline/accumulator');
const { wrap } = require('module');
const validateFields = require('./create-person-pipeline/validation/fields');
const save = require('./create-person-pipeline/save');
const invalidate = require('./create-person-pipeline/invalidate');

const createPersonStream = new stream.Readable({read(){}});

stream.pipeline(
    req,
    accumulator(),
    wrap(res),
    parse,
    validateFields,
    save,
    () => invalidate(res)
)

async function createPerson(req, res) {
    
}

module.exports = createPerson;