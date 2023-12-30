"use strict"
const stream = require('stream');
const accumulator = require('./create-person-pipeline/accumulator');
const { wrap } = require('module');
const validateFields = require('./create-person-pipeline/validation/fields');
const save = require('./create-person-pipeline/save');

const createPersonStream = new stream.Readable({ read() {} });


async function createPerson(req, res) {
    stream.pipeline(
        req,
        accumulator(),
        wrap(res),
        parse,
        validateFields,
        save
    )
}

module.exports = createPerson;