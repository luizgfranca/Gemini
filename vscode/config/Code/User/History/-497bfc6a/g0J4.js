const { applicationProperties, LogLevelOptions } = require('../../../properties');
const { dispatchLog } = require('./dispatcher')
const noop = require('../../../utils/noop')

const logDispatcherFactory = (logType) =>
    (applicationProperties.LOG_LEVEL >= LogLevelOptions[logType])
        ? (args) => dispatchLog(logType, args) 
        : noop;

module.exports = { logDispatcherFactory }