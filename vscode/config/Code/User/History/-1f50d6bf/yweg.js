const { applicationProperties, LogLevelOptions } = require('../../properties');
const LogType = require('./log-tyoe');

function noop(){};



function dispatchLog(logType, args) {

}

const logDispatcherProvider = (logLevel) => applicationProperties.LOG_LEVEL >= LogLevelOptions[logLevel]
    ? (args) => dispatchLog(logType, args) 
    : noop;

const LoggerService = {
    info: logDispatcherProvider(LogType.INFO),
    log: logDispatcherProvider(LogType.LOG),
    debug: logDispatcherProvider(LogType.DEBUG),
    trace: logDispatcherProvider(LogType.TRACE),
}

module.exports = LoggerService
