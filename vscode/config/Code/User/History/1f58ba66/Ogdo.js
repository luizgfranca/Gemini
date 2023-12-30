"use strict"
const { AccumulateStream } = require('accumulate-stream');
const { Transform } = require('stream');

const requestAccumulator = new Transform({
    objectMode: true,
    transform({req, res}, _, callback) {
        const accumulator = new AccumulateStream({size: '1kb'});
    }
})

module.exports = requestAccumulator;