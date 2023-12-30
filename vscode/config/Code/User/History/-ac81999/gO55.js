const { logEvents } = require('../log-events');

function dispatchLog(logType, args) {
    console.log('dispatching');
    logEvents.emit('log', {
        logType,
        args
    })
    console.log('dispatched');
}

module.exports = { dispatchLog }