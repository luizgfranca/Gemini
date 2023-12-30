const stream = require('stream');
const stream = require('stream');
const wrap = require('./transformer/wrap');
const time = require('./transformer/time');
const divide = require('./transformer/divide');
const parseObjectArgs = require('./transformer/parse-object');
const reduceArgs = require('./transformer/reduce');
const build = require('./transformer/build');
const logStream = new stream.Readable({objectMode: true});

const peek = new stream.Transform({
    objectMode: true,
    transform: (chunk, _, callback) => {
        console.log(chunk);
        callback(chunk)
    }
})

stream.pipeline(
    logStream,
    wrap,
    time,
    divide,
    parseObjectArgs,
    reduceArgs,
    build,
    print
)

module.exports = { logStream };