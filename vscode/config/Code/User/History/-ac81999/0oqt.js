const { logStream } = require("../stream/log-stream")

function dispatchLog(logType, args) {
    logStream.push({
        logType,
        args
    })
}

module.exports = { dispatchLog }