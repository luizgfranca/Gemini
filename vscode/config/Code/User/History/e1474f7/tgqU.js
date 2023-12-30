const fs = require('fs')
const path = require('path');
const LoggerService = require('../service/logger/logger.service');

function loadFile(relativePath, loadedResourceResolver) {
    const absolutePath = path.resolve(__dirname, '..', '..', 'public', relativePath.replace('/', ''));
    LoggerService.debug('Reading file from filesystem: ' + absolutePath)
    return fs.readFile(absolutePath, (error, data) => {
        if(error) {
            return setImmediate(() => loadedResourceResolver(relativePath, null))
        }

        return setImmediate(() => loadedResourceResolver(relativePath, data));
    })
}

function loadFileStream() {
    
}

module.exports = loadFile