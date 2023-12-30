const stream = require('stream');
const wrap = require('./transformer/wrap');
const time = require('./transformer/time');
const divide = require('./transformer/divide');
const parseObjectArgs = require('./transformer/parse-object');
const reduceArgs = require('./transformer/reduce');
const build = require('./transformer/build');
const print = require('./transformer/print');
const logEvents = require('./log-events');


const logStream = new stream.Readable({
    objectMode: true, 
    read() {}
    // read() {
    //     logEvents.on('log', (data) => {
    //         console.trace('event::log', data)
    //         this.push(data);
    //     })
    // }
});

const peek = (name) => 
    new stream.Transform({
        objectMode: true,
        transform: (chunk, _, callback) => {
            console.log(name, chunk);
            callback(null, chunk)
        }
    })

stream.pipeline(
    logStream,
    peek('logStream'),
    wrap,
    peek('wrap'),
    time,
    peek('time'),
    divide,
    peek('divide'),
    parseObjectArgs,
    peek('parseObjectArgs'),
    reduceArgs,
    peek('reduceArgs'),
    build,
    peek('build'),
    print,
    (err) => console.error(err)
)

module.exports = { logStream };