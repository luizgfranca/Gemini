"use strict"
const http = require('http');
const router = require('./router');
const onNotification = require('./provider/notification');
// const DatabaseProvider = require('./provider/database-pool');

const server = http.createServer(router)
onNotification('', () => {})

// DatabaseProvider.setupConnectionPool();

server.listen(8080, () => console.log('server started'));