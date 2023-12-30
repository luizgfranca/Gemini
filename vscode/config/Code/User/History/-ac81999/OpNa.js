const logEventEmitter = new EventEmitter();
logEventEmitter.setMaxListeners(0);

function dispatchLog(logType, args) {
    logEventEmitter.
    console[logType.toLowerCase()](args);
}

module.exports = { dispatchLog }