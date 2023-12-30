"use strict"
const { AccumulateStream } = require('accumulate-stream');
const { Transform } = require('stream');

const requestAccumulator = new Transform({
    objectMode: true,
    transform({req, res}, _, callback) {
        
    }
})

module.exports = requestAccumulator;