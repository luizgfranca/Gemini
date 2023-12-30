const stream = require('stream');

const logStream = new stream.Readable({objectMode: true});

module.exports = { logStream };