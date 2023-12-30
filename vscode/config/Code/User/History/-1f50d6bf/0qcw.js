const { applicationProperties, LogLevelOptions } = require('../../properties');
const LogType = require('./log-tyoe');
const { logDispatcherFactory } = require('./dispatcher/factory')

function noop(){};

function dispatchLog(logType, args) {

}


const LoggerService = {
    info: logDispatcherFactory(LogType.INFO),
    log: logDispatcherFactory(LogType.LOG),
    debug: logDispatcherFactory(LogType.DEBUG),
    trace: logDispatcherFactory(LogType.TRACE),
}

module.exports = LoggerService
