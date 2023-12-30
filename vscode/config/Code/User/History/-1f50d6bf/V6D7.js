const { applicationProperties, LogLevelOptions } = require('../../properties');

function noop(){};

function dispatchLog(args) {

}

const LoggerService = {
    info: dispatchLog,
    log: applicationProperties.LOG_LEVEL >= LogLevelOptions.LOG ? dispatchLog : noop,
    
    
    (args) => {
        if()
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
