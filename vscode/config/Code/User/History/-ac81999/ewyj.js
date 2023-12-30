const { logStream } = require("../stream")

function dispatchLog(logType, args) {
    logStream.push({
        logType,
        args
    })
}

module.exports = { dispatchLog }