const { logEvents } = require('../log-events');

function dispatchLog(logType, args) {
    logStream.push({
        logType,
        args
    })
}

module.exports = { dispatchLog }