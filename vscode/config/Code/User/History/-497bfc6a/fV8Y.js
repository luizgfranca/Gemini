const logDispatcherFactory = (logLevel) => applicationProperties.LOG_LEVEL >= LogLevelOptions[logLevel]
    ? (args) => dispatchLog(logType, args) 
    : noop;

module.exports = { logDispatcherProvider: logDispatcherFactory }