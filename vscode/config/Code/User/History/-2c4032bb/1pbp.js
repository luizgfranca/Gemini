"use strict"

async function invalidate(res) {
    res.statusCode = 422;
    res.end();
}

module.exports = invalidate