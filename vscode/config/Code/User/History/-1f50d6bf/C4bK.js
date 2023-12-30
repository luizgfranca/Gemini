const { applicationProperties, LogLevelOptions } = require('../../properties');

function dispatchLog(args) {

}

const LoggerService = {
    info: dispatchLog,
    log: (args) => {
        if(applicationProperties.LOG_LEVEL >= LogLevelOptions.LOG)
            console.log(args)
    },
    debug: (args) => {
        if(applicationProperties.LOG_LEVEL >= LogLevelOptions.DEBUG)
            console.debug(args)
    },
    trace: (args) => {
        if(applicationProperties.LOG_LEVEL >= LogLevelOptions.TRACE)
            console.trace(args)
    }
}

module.exports = LoggerService
