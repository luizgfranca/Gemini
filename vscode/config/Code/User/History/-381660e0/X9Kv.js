"use strict"
const stream = require('stream');

const { wrap } = require('module');
const validateFields = require('./create-person-pipeline/validation/fields');
const save = require('./create-person-pipeline/save');
const invalidate = require('./create-person-pipeline/invalidate');
const requestAccumulator = require('./create-person-pipeline/request-accumulator');
const parse = require('./create-person-pipeline/parse');
const generateId = require('./create-person-pipeline/generate-id');
const validateUniqueNickname = require('./create-person-pipeline/validation/nickname');

const createPersonStream = new stream.Readable({objectMode: true, read(){}});

const peek = new stream.Transform({objectMode: true, transform(data, _, callback) {
    callback(null, data)
}})

stream.pipeline(
    createPersonStream,
    requestAccumulator,
    parse,
    validateFields,
    validateUniqueNickname,
    generateId,
    save,
    (error) => console.error('create person error', error)
)

async function createPerson(req, res) {
    req.on('error', (error) => console.error(error))
    createPersonStream.push({ req, res });
}

module.exports = createPerson;