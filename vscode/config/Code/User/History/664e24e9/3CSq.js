"use strict"
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req);
    res.statusCode = 200;
    res.end();
})

server.listen(8080, () => console.log('server started'));a