"use strict"

async function invalidate(res) {
    res.statusCode = 400;
    res.end();
}

module.exports = invalidate