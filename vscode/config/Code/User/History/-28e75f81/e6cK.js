import http from 'http'
import morgan from 'morgan'
import bodyParser from 'body-parser'


function setupNode(app) {
    app.server = http.createServer(app)
    app.use(morgan('dev'))
    app.use(bodyParser.json())

    app.post('/echo', (req, res) => {
        console.log(req.data)
        process.send(`handled echo request ${JSON.stringify(req.data)}`)
        res.json(req.data)
    })
}


export { setupNode }