async function emptyList(res) {
    return res.writeHead(200, {'Content-Type': 'application/json'}).end();
}