"use strict"
const stream = require('stream')

const createPersonStream = new stream.Readable({
    read() {}
});

async function createPerson(req, res) {

}

module.exports = createPerson;