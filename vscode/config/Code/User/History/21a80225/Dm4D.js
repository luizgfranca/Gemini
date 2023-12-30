function badRequest(res) {
    res.statusCode = 400;
    res.end();
}

module.exports = badRequest;