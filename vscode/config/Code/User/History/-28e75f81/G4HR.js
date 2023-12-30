import http from 'http'


function setupNode(app) {
    app.server = http.createServer(app)
}


export { setupNode }