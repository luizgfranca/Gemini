function dispatchLog(logType, args) {
    console[logType](args);
}

module.exports = { dispatchLog }