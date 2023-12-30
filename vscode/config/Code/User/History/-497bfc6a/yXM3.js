const logDispatcherProvider = (logLevel) => applicationProperties.LOG_LEVEL >= LogLevelOptions[logLevel]
    ? (args) => dispatchLog(logType, args) 
    : noop;

module.exports = { logDispatcherProvider }