async function invalidate(res) {
    res.statusCode = 200;
    res.end();
}

module.exports = invalidate