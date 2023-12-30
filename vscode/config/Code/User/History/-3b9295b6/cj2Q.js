function emptyList(res) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    .end();
}