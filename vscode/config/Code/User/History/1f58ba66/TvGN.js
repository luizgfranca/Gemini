"use strict"
const { AccumulateStream } = require('accumulate-stream');
const { Transform, once } = require('stream');

const requestAccumulator = new Transform({
    objectMode: true,
    transform: async ({req, res}, _, callback) => {
        const accumulator = new AccumulateStream({size: '1kb'});
        accumulator.pipe(req);
        await once(accumulator, 'data');
    }
})

module.exports = requestAccumulator;