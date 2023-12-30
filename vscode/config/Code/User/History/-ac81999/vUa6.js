const { logEvents } = require('../log-events');

function dispatchLog(logType, args) {
    logEvents.emit('log', {
        logType,
        args
    })
}

module.exports = { dispatchLog }