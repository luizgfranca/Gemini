const { applicationProperties, LogLevelOptions } = require('../../properties');
const LogType = require('./log-tyoe');
const { logDispatcherProvider } = require('./dispatcher/provider')

function noop(){};

function dispatchLog(logType, args) {

}


const LoggerService = {
    info: logDispatcherProvider(LogType.INFO),
    log: logDispatcherProvider(LogType.LOG),
    debug: logDispatcherProvider(LogType.DEBUG),
    trace: logDispatcherProvider(LogType.TRACE),
}

module.exports = LoggerService
