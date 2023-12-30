const LogType = require('./log-tyoe');
const { logDispatcherFactory } = require('./dispatcher/factory')

const LoggerService = {
    info: logDispatcherFactory(LogType.INFO),
    log: logDispatcherFactory(LogType.LOG),
    debug: logDispatcherFactory(LogType.DEBUG),
    trace: logDispatcherFactory(LogType.TRACE),
}

module.exports = LoggerService
