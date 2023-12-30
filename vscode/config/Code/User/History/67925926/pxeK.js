"use strict"
async function countPersons(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html')
    res.end("this is a test");
}

module.exports = countPersons;