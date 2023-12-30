const { Readable } = require('node:stream');

class LogStream extends Readable {
    constructor(eventEmitter, eventName) {
        super();
        this.eventName = eventName;

    }
}