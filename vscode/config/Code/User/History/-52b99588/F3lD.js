const { Readable } = require('node:stream');

class LogStream extends Readable {
    constructor(eventEmitter, eventName) {
        super();
        this.eventEmitter = eventEmitter;
        this.eventName = eventName;
    }
    _construct(callback) {
        
    }
}