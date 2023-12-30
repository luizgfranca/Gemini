


function dispatchLog(logType, args) {
    console[logType.toLowerCase()](args);
}

module.exports = { dispatchLog }