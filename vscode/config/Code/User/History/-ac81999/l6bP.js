const { logEvents } = require('../log-events');

function dispatchLog(logType, args) {
    console.log('dispatching');
    logEvents.emit('log', {
        logType,
        args
    })
}

module.exports = { dispatchLog }