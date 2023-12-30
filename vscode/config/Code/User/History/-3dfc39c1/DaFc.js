const logEvents = new EventEmitter();
logEvents.setMaxListeners(0);

module.exports = { logEvents };