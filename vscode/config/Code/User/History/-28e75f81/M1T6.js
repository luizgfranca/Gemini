import http from 'http'
import morgan from 'morgan'
import bodyParser from 'body-parser'

function setupRouting(app) {
    app.post('/echo', (req, res) => {
        
    })
}

function setupNode(app) {
    app.server = http.createServer(app)
    app.use(morgan('dev'))
    app.use(bodyParser.json())


    

}


export { setupNode }