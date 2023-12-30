async function notFound(res) {
    res.statusCode = 404;
    return res.end();
}

module.exports = notFound