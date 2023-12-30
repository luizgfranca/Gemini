"use strict"
const http = require('http');
const router = require('./router');
const onNotification = require('./provider/notification');
const StackSearchIndexUpdaterJob = require('./job/stack-search-index-updater');

const server = http.createServer(router)
StackSearchIndexUpdaterJob.start();

server.listen(8080, () => console.log('server started'));