const { logStream } = require("../stream/stream")

logStream

function dispatchLog(logType, args) {
    logEvents.emit('log', {
        logType,
        args
    })
}

module.exports = { dispatchLog }