"use strict"
async function countPersons(req, res) {
    res.statusCode = 200;
    res.end('2');   
}

module.exports = countPersons;