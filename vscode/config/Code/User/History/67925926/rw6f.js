"use strict"
async function countPersons(req, res) {
    res.body = 2;
    res.statusCode = 200;
    res.end();
}

exports = countPersons;