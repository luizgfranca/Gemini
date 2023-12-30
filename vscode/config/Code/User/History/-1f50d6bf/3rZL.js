const { applicationProperties, LogLevelOptions } = require('../../properties');

function noop(){};

const LogType = {
    
}


function dispatchLog(logLevel, args) {

}

const logDispatcher = (logLevel) => (args) => dispatchLog(logLevel, args);


const LoggerService = {
    info: logDispatcher(),
    log: applicationProperties.LOG_LEVEL >= LogLevelOptions.LOG ? dispatchLog : noop,
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
