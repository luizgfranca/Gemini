

function dispatchLog(logType, args) {
    logEvents.emit('log', {
        logType,

    })
    console[logType.toLowerCase()](args);
}

module.exports = { dispatchLog }