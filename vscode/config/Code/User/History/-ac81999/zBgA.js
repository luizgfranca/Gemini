const { logEvents } = require('../log-events');
const { logStream } = require('../stream');

function dispatchLog(logType, args) {
    console.log('dispatching');
    logStream.push({logType, args})

    // logEvents.emit('log', {
    //     logType,
    //     args
    // })
    // console.log('dispatched');
}

module.exports = { dispatchLog }