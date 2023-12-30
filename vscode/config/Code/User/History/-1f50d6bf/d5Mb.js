const { applicationProperties, LogLevelOptions } = require('../../properties');

function noop(){};

const LogType = {
    INFO: 'INFO',
    LOG: 'LOG',
    DEBUG: 'DEBUG',
    TRACE: 'TRACE'
}


function dispatchLog(logType, args) {

}

const logDispatcherProvider = (logLevel) => (args) => dispatchLog(logType, args);

const LoggerService = {
    info: logDispatcherProvider(LogType.INFO),
    log: applicationProperties.LOG_LEVEL >= LogLevelOptions.LOG ? logDispatcherProvider(LogType.LOG) : noop,
    debug: applicationProperties.LOG_LEVEL >= LogLevelOptions.LOG ? logDispatcherProvider(LogType.LOG) : noop,
    trace: applicationProperties.LOG_LEVEL >= LogLevelOptions.LOG ? logDispatcherProvider(LogType.LOG) : noop,
}

module.exports = LoggerService
