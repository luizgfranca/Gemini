"use strict"
const { AccumulateStream } = require('accumulate-stream');
const { Transform, once } = require('stream');
const { buffer } = require('stream/consumers');

const requestAccumulator = new Transform({
    objectMode: true,
    transform: async ({req, res}, _, callback) => {
        const accumulator = new AccumulateStream({size: '1kb'});

        const buffer = '';

        req.on('data', (chunk) => buffer += chunk);
        req.on('end', () => callback(null, {res, payload: buffer.toString()})

        req.pipe(accumulator);
        accumulator.on('chunk', ({ buffer }) => console.log(`emitted every chunk write - ${buffer.toString()}`));
        accumulator.on('size', ({ buffer }) => console.log(`emitted every 1kb of chunks - ${buffer.toString()}`));
        accumulator.on(
            'data', 
            (buffer) => )
        )
    }
})

module.exports = requestAccumulator;