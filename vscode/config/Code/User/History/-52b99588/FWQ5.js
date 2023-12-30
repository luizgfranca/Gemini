const stream = require('stream');
const wrap = require('./transformer/wrap');
const time = require('./transformer/time');
const divide = require('./transformer/divide');
const parseObjectArgs = require('./transformer/parse-object');
const reduceArgs = require('./transformer/reduce');
const build = require('./transformer/build');
const print = require('./transformer/print');
const noop = require('../../utils/noop');


const logStream = new stream.Readable({
    objectMode: true, 
    read: noop
});

stream.pipeline(
    logStream,
    wrap,
    time,
    divide,
    parseObjectArgs,
    reduceArgs,
    build,
    print,
    (err) => console.error(err)
)

module.exports = { logStream };