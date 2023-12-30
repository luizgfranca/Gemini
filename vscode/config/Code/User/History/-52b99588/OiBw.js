const stream = require('stream');
const wrap = require('./transformer/wrap');
const time = require('./transformer/time');
const divide = require('./transformer/divide');
const parseObjectArgs = require('./transformer/parse-object');
const reduceArgs = require('./transformer/reduce');
const build = require('./transformer/build');
const print = require('./transformer/print');
const { pipeline } = require('stream/promises');
const logStream = new stream.Readable({objectMode: true});

const peek = new stream.Transform({
    objectMode: true,
    transform: (chunk, _, callback) => {
        console.log(chunk);
        callback(chunk)
    }
})

pipeline(
    logStream,
    peek,
    wrap,
    peek,
    time,
    peek,
    divide,
    peek,
    parseObjectArgs,
    peek,
    reduceArgs,
    peek,
    build,
    peek,
    print
)

module.exports = { logStream };