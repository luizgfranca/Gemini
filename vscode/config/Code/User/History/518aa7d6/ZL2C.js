const stream = require('stream');
const wrap = require('./transformer/wrap');
const time = require('./transformer/time');
const divide = require('./transformer/divide');
const parseObjectArgs = require('./transformer/parse-object');
const reduceArgs = require('./transformer/reduce');
const build = require('./transformer/build');

const logPipeline = stream.pipeline(
    wrap,
    time,
    divide,
    parseObjectArgs,
    reduceArgs,
    build,
    print
)