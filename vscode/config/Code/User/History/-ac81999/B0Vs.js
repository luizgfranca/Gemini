const { logStream } = require("../stream/log-stream")

function dispatchLog(logType, args) {
    logEvents.emit('log', {
        logType,
        args
    })
}

module.exports = { dispatchLog }