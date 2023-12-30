const stream = require('stream');
const wrap = require('./transformer/wrap');
const time = require('./transformer/time');

const logPipeline = stream.pipeline(
    wrap,
    time,
    d
)