import http from 'http'
import morgan from 'morgan'

function setupNode(app) {
    app.server = http.createServer(app)
    app.use(morgan('dev'))

    

}


export { setupNode }