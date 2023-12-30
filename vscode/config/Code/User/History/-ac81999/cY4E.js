const { logEvents } = require('../events');

function dispatchLog(logType, args) {
    logEvents.emit('log', {
        logType,
        args
    })
}

module.exports = { dispatchLog }