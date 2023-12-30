"use strict"
const stream = require('stream');
const accumulator = require('./create-person-pipeline/accumulator');
const { wrap } = require('module');
const validateFields = require('./create-person-pipeline/validation/fields');
const save = require('./create-person-pipeline/save');
const invalidate = require('./create-person-pipeline/invalidate');

async function createPerson(req, res) {
    stream.pipeline(
        req,
        accumulator(),
        wrap(res),
        parse,
        validateFields,
        save,
        () => invalidate(res)
    )
}

module.exports = createPerson;