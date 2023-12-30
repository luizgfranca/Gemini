"use strict"
async function countPersons(req, res) {
    res.write("2");
    res.statusCode = 200;
    res.end();
}

module.exports = countPersons;