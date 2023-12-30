const LogLevelOptions = {
    INFO: 0,
    LOG: 1,
    DEBUG: 2,
    TRACE: 3
}

const applicationProperties = {
    LOG_LEVEL: LogLevelOptions.TRACE,
    HOST: 'localhost',
    PORT: 8080
}

module.exports = { applicationProperties, LogLevelOptions };