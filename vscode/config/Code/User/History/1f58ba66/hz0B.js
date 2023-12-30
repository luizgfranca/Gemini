"use strict"
const { Transform } = require('stream');

const requestAccumulator = new Transform({
    objectMode: true,
    transform: async ({req, res}, _, callback) => {
        let buffer = '';

        req.on('data', (chunk) => {
            console.log('data', chunk.toString())
            buffer += chunk
        });
        req.on('end', () => {
            console.log('end', buffer.toString())
            callback(
            null, 
            { res, payload: buffer.toString() }
        )})
    }
})

module.exports = requestAccumulator;