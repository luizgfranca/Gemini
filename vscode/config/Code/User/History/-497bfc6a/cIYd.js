const { applicationProperties, LogLevelOptions } = require('../../../properties');

const logDispatcherFactory = (logLevel) =>
    (applicationProperties.LOG_LEVEL >= LogLevelOptions[logLevel])
        ? (args) => dispatchLog(logType, args) 
        : noop;

module.exports = { logDispatcherFactory }